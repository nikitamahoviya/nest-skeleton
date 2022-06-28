import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { createLoggerFactory } from './logger/winston.logger';

export const LOGGER = 'LOGGER';

export type CoreModuleOptions = {
    // Set logger label in the module where you import CoreModule
    loggerLabel?: string;
};

@Module({
    imports: [
        ConfigModule.forRoot({load: [configuration]}),
    ],
    providers: [],
    exports: [ConfigModule],
})

export class CoreModule {
    static forRoot(options: CoreModuleOptions): DynamicModule {
        return {
            global: true,
            module: CoreModule,
            providers: [
                {
                    provide: LOGGER,
                    useFactory: (configService: ConfigService) => {
                        return createLoggerFactory(
                            options.loggerLabel || 'Main',
                            configService,
                        );
                    },
                    inject: [ConfigService],
                },
            ],
            exports: [LOGGER],
        };
    }
}
