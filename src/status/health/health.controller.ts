import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { CONSTANTS } from './../../common/config/configuration';
import { HealthService } from './health.service';

@ApiTags(CONSTANTS.ROUTES.HEALTH.TAG)
@Controller(CONSTANTS.ROUTES.HEALTH.CONTROLLER)
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    @HealthCheck()
    getHealthStatus(): Promise<HealthCheckResult> {
        return this.healthService.getHealthStatus();
    }
}
