## Source code

    .
    ├── ...
    ├── src                                                     # Top level structure
    │   ├── common/                                             # common code
    │       ├── config/                                         # configurations for the micro-service
    │       ├── database/                                       # common database definitions and helpers
    │       ├── filters/                                        # common filters
    │       ├── interceptors/                                   # common interceptors
    │       ├── logger/                                         # common logger definitions
    │       ├── models/                                         # common model definitions
    │       ├── core.module.ts                                  # core module to bind common items
    |       └── ...                                             # more items.
    │   ├── {controller-name}/                                  # controller directory
    │       ├── {controller-name}.controller.ts                 # controller definition
    │       ├── {controller-name}.controller.spec.ts            # controller unit tests
    │       ├── {controller-name}.service.ts                    # controller external service (if applicable)
    │       ├── {controller-name}.service.spec.ts               # controller external service tests
    │       └── ...                                             # more items.
    │   ├── status/                                             # status directory
    │       ├── health/                                         # status - health
    │           ├── health.controller.ts                        # health controller definition
    │           ├── health.controller.spec.ts                   # health controller unit tests
    │           ├── health.service.ts                           # health controller external service
    │           ├── health.service.spec.ts                      # health controller external service tests
    │       ├── status.module.ts                                # common status module for all status definitions
    │       └── ...                                             # more items.
    ├── app.cntroller.spec.ts                                   # app controller tests
    ├── app.cntroller.ts                                        # app controller definitions
    ├── app.module.ts                                           # main app module which binds all other module and exposes in main.ts
    ├── app.service.ts                                          # common app level service
    ├── main.ts                                                 # Main nestjs configuration which includes module definitions, swagger etc
    └── ...


## Functional Test

    .
    ├── ...
    ├── test                                   # Top level test structure
    │   ├── functional/                        # functional tests directory
    │       ├── features/                      # features directory
    │           ├── example.feature            # example feature 1
    |           └── ...                        # more items.
    │       ├── step-definitions/              # step-definitions directory
    │           ├── example.step.ts            # example step definition 1
    │           └── ...                        # more items.
    ├── cucumber.js                            # Main cucumber configurations (Profile based)
    │   ├── test-config.ts                     # test configurations (Any default values/assumptions to be mentioned in one place even if hard-coded)
    └── ...

[Functional test with cucumber readme](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/test/functional/Readme.md)

## Performance Test

    ├── ...
    ├── test                                   # Top level structure
    │   ├── performance/                       # performance tests directory
    │       ├── data/                          # datasets for tests
    │       ├── group-name/                    # groupped by
    │           ├── config.yaml                # config for the group
    │           ├── scenarios/                 # scenarios folder
    │               ├── scenario-1.yaml        # scenaro-1 configs
    │               ├── scenario-2.yaml        # scenaro-2 configs
    │               └── ...                    # more items.
    │       └── ...                            # more items.
    │   ├── test-config.ts                     # test configurations (Any default values/assumptions to be mentioned in one place even if hard-coded)
    └── ...

[Performace test with artillery readme](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/test/performance/Readme.md)
