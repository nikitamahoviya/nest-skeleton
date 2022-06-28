import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';

@Module({
    imports: [
        HttpModule,
        TerminusModule,
        ScheduleModule.forRoot()
    ],
    controllers: [HealthController],
    providers: [HealthService],
})
export class StatusModule {}
