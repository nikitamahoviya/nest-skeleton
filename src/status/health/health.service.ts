import { Injectable } from '@nestjs/common';
import {
    DiskHealthIndicator,
    HealthCheckService,
    HttpHealthIndicator,
    MemoryHealthIndicator,
} from '@nestjs/terminus';
import { Cron, CronExpression } from '@nestjs/schedule';
import { App } from './../../common/models/config.models';
import { ConfigService } from '@nestjs/config';
import { CONSTANTS } from './../../common/config/configuration';

@Injectable()
export class HealthService {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly diskHealthIndicator: DiskHealthIndicator,
        private readonly memoryHealthIndicator: MemoryHealthIndicator,
        private readonly httpHealthIndicator: HttpHealthIndicator,
        private readonly configService: ConfigService
    ) { }

    appInfo = this.configService.get<App>(CONSTANTS.CONFIG.APP, { infer: true })
    appHost = `${this.appInfo.protocol}://${this.appInfo.host}:${this.appInfo.port}`;

    @Cron(CronExpression.EVERY_30_MINUTES)
    checkDisk() {
        if (this.appInfo.health.enablePeriodicCheck) {
            return this.healthCheckService.check([
                () =>
                    this.diskHealthIndicator.checkStorage(this.appInfo.health.disk.key, {
                        thresholdPercent: this.appInfo.health.disk.threshold,
                        path: this.appInfo.health.disk.path,
                    }),
            ]);
        }
    }

    @Cron(CronExpression.EVERY_30_MINUTES)
    checkMemory() {
        if (this.appInfo.health.enablePeriodicCheck) {
            return this.healthCheckService.check([
                () =>
                    this.memoryHealthIndicator.checkHeap(this.appInfo.health.memory.heapKey, this.appInfo.health.memory.heapThreshold),
                () =>
                    this.memoryHealthIndicator.checkRSS(this.appInfo.health.memory.rssKey, this.appInfo.health.memory.rssThreshold),
            ]);
        }
    }

    getHealthStatus() {
        return this.healthCheckService.check([
            () => this.httpHealthIndicator.pingCheck(this.appInfo.name, this.appHost),
        ]);
    }
}
