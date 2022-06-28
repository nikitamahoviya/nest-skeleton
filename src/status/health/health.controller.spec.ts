import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

const mockedItem = {status: "ok", details: {"nest-skeleton": {status: "ok"}}}

describe('HealthController', () => {
  let controller: HealthController;

  const config = () => ({
    app: {
      host: process.env.APP_HOST || '127.0.0.1',
      port: parseInt(process.env.APP_PORT, 10) || 3000,
      protocol: process.env.APP_PROTOCOL || 'http',
      name: process.env.APP_NAME || 'nest-skeleton',
      health: {
        disk: {
          key: process.env.DISK_HEALTH_KEY || 'ms-disk',
          threshold: parseFloat(process.env.DISK_HEALTH_THRESHOLD) || 0.9,
          path: process.env.DISK_HEALTH_PATH || 'C:\\'
        },
        memory: {
          heapKey: process.env.MEMORY_HEALTH_HEAP_KEY || 'memory_heap',
          heapThreshold: parseInt(process.env.APP_PORT, 10) || 150 * 1024 * 1024,
          rssKey: process.env.MEMORY_HEALTH_RSS_KEY || 'memory_rss',
          rssThreshold: parseInt(process.env.APP_PORT, 10) || 150 * 1024 * 1024
        }
      }
    }
  })
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, ScheduleModule.forRoot(), ConfigModule.forRoot({load: [config]})],
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            getHealthStatus: jest.fn().mockImplementation(() => mockedItem)
          }
        },
      ]
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get health status from health service', () => {
    expect(controller.getHealthStatus()).toBe(mockedItem);
  });
});
