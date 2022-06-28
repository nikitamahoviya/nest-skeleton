import { ConfigModule } from '@nestjs/config';
import { DiskHealthIndicator, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

const mockedItem = {status: "ok", details: {"nest-skeleton": {status: "ok"}}}

describe('HealthService', () => {
  let service: HealthService;

  const config = () => ({
    app: {
      host: process.env.APP_HOST || '127.0.0.1',
      port: parseInt(process.env.APP_PORT, 10) || 3000,
      protocol: process.env.APP_PROTOCOL || 'http',
      name: process.env.APP_NAME || 'nest-skeleton',
      health: {
        enablePeriodicCheck: true,
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
      imports: [TerminusModule, ConfigModule.forRoot({load: [config]})],
      providers: [HealthService,
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn().mockImplementation(() => mockedItem)
          }
        },
        {
          provide: DiskHealthIndicator,
          useValue: {
            checkStorage: jest.fn().mockImplementation(() => mockedItem)
          }
        },
        {
          provide: MemoryHealthIndicator,
          useValue: {
            checkHeap: jest.fn().mockImplementation(() => mockedItem),
            checkRSS: jest.fn().mockImplementation(() => mockedItem)
          }
        },
        {
          provide: HttpHealthIndicator,
          useValue: {
            pingCheck: jest.fn().mockImplementation(() => mockedItem)
          }
        }
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should check the memory status', () => {
    expect(service.checkMemory()).toBe(mockedItem);
  });

  it('should check the disk status', () => {
    expect(service.checkDisk()).toBe(mockedItem);
  });

  it('should check the app status', () => {
    expect(service.getHealthStatus()).toBe(mockedItem);
  });
});
