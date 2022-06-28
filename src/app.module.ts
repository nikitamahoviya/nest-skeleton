import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration, { CONSTANTS } from './common/config/configuration';
import { CoreModule } from './common/core.module';
// import { AuthModule } from './common/guards/auth/auth.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    // Import ConfigModule with global config. No need to import in other modules
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    // Import CoreModule with global config. If you need to set different labels in different modules,
    // then you can import in other modules with correct label set.
    CoreModule.forRoot({ loggerLabel: CONSTANTS.LOG.LABEL }),
    // Enable cache Module
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('app.cache.ttl'),
        max: configService.get('app.cache.maxCount')
      }),
      inject: [ConfigService],
    }),
    StatusModule,
    // AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
