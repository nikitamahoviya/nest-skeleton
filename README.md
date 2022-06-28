## Changes To project built from this Skeleton
- Replace all occurances of ```nest-skeleton``` project name with new project name. Example ``` find ./ -type f -exec sed -i 's/nest-skeleton/document-upload-service/g' {} \;```
- Replace all occurances of ```NestJS Skeleton``` with logical name of the new service. Example ``` find ./ -type f -exec sed -i 's/NestJS Skeleton/Document Upload Service/g' {} \;```


## Description

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Note: This repository is configured to use NestJs with [Fastify framework](https://www.fastify.io/)

# Environment requirements
- NodeJS - 16.15.X and above (currently built using v16.15.0)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
### Verify if the App is Up and Running
``` curl http://localhost:3000/health ```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:coverage
```

For any specific scripts visit package.json scripts section

## [Functional E2E tests (Cucumber)](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/test/functional/Readme.md)

## [Performance E2E tests (Artillery)](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/test/performance/Readme.md)

## [Doc Guides](https://github.com/DigitalAssetPortal/nest-skeleton/tree/main/docs)
- [Nomenclature](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/docs/Nomenclature.md)
- [Structure](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/docs/Structure.md)

## Swagger UI

Swagger documentation is created using the fastify-swagger library, for help visit the [link](https://docs.nestjs.com/openapi/introduction)
- To view swagger documentation visit path '{HOST}/docs' or for json '{HOST}/docs-json' 

## How to use?

- On development environment the service is exposed at `localhost:3000` by default
- To access swagger documentation in development environment use `localhost:3000/docs`

## Docker compose helper:

```bash
# sample example to run from docker-compose
  project-name:
    container_name: project-name
    build:
      context: .
      # name of environment to use respective image from dockerfile. values: [development, production]
      target: development
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    # command to run app with
    command: npm run start:dev
    env_file:
      - .env
```
