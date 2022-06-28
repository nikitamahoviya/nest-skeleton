import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CONSTANTS } from './common/config/configuration';
import { CommonExceptionFilter } from './common/filters/common-exception.filter';
import { HeaderInterceptor } from './common/interceptors/header.interceptor';
import { StatusModule } from './status/status.module';

async function bootstrap() {
  // Create nestjs application with Fastify adapter
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // Create congig service instance for all the configs.
  const configService = app.get<ConfigService>(ConfigService);

  // Enable global prefix if required; To be added before swagger setup
  app.setGlobalPrefix(CONSTANTS.ROUTES.API, { exclude: [CONSTANTS.ROUTES.BASE, CONSTANTS.ROUTES.HEALTH.CONTROLLER] });

  // Enable validation pipe to apply any param/class validations; If not enabled any dto validations would not work
  // app.useGlobalPipes(new ValidationPipe());

  // Enable Header Interceptor; Any header manupulations
  // app.useGlobalInterceptors(new HeaderInterceptor());

  // Enable Common Exception Filter for common error responses
  // app.useGlobalFilters(new CommonExceptionFilter());

  // Enable api versioning if required; To be added before swagger setup
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  const config = new DocumentBuilder()
    .setTitle(CONSTANTS.SWAGGER.HEADER)
    .setDescription(CONSTANTS.SWAGGER.DESCRIPTION)
    // .setVersion(CONSTANTS.SWAGGER.VERSION)
    // .addTag(CONSTANTS.SWAGGER.TAG)
    .build();

  // TODO: Add modules in include list for the modules which has controllers
  // that you want to be included in swagger documentation.
  const document = SwaggerModule.createDocument(app, config, {include: [StatusModule]});

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: CONSTANTS.SWAGGER.TITLE,
    explorer: true
  };
  
  SwaggerModule.setup(CONSTANTS.SWAGGER.DOCS, app, document, customOptions);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  console.log(`App listening on port: ${configService.get(CONSTANTS.CONFIG.PORT)}`)
  await app.listen(configService.get(CONSTANTS.CONFIG.PORT), configService.get(CONSTANTS.CONFIG.HOST));
}
bootstrap();