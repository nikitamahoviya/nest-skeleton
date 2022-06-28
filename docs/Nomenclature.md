## Nomenclatures:

Nomenclature is a system of names or terms, or the rules for forming these terms in a particular area. It defines and sets discipline practice to keep consistency across projects, code bases etc. Anything mentioned here is to be followed while naming in the projects or code base so that everyone is using the same rules always

## Typescript:

[Style Guide for more information](https://google.github.io/styleguide/tsguide.html)

`Class/Interface/Type/Enum/Decorator/TypeParameter`:

•	Should be in `PascalCase` or `UpperCamelCase`
•	Should not include hyphen, underscore or any special characters

`Function/Variable/Parameter/Method/Property/Alias`:

•	Should be in `lowerCamelCase`
•	Should not include hyphen, underscore or any special characters

`Constants/EnumValues`:

•	Shoulde be in `CONSTANT_CASE` or `UPPERCASE` with underscores

`Folders`:

•	Always have meaningful names for folder groups. Do not group any random category items together. A folder name should be in lower case when having multiple words, they can be written in lower skewer case for eg: user-management

`Files`:

Always have meaningful names for files. A file name can be different for different areas of implementation. For any specific area refer below:
•	Any general typescript file should be named in lower skewer case for eg: error-handler.ts

•	`NestJS`:

    .
    ├── ...
    ├── Any file naming in Nest should follow lower skewer case along with the type of file you are trying to create. For eg: app.module.ts
    ├── `Types`:
    │   ├── `module` – Module definition for eg: app.module.ts
    │   ├── `controller` – Controller/Route definitions for API for eg: app.controller.ts
    │   ├── `service` – Service/Business Logic/External operations for eg: app.service.ts
    │   ├── `spec` – Tests for eg: app.controller.spec.ts
    │   ├── `models` – Model/Interface definitions for eg: api.models.ts
    │   ├── `interceptor` – Interceptors for eg: http-header.interceptor.ts
    │   ├── `filter` – Filters of any kind- for eg: common-exception.filter.ts
    │   ├── `guard` – For Guards against api for eg: auth.guard.ts
    │   ├── `logger` -any logger definitions for eg: Winston.logger.ts
    │   ├── someothertype – some other type if any for eg: <filename>.someothertype.ts
    └── ...


•	`JSON`:

    .
    ├── ...
    ├──`PropertyName`: 
    │   ├── Should be in lowerCamelCase for most properties
    │   ├── Should start with underscore for any kind of private values
    │   ├── If at all required property can be of snake_case (To be discussed within the team and reasoning to use for the need)
    └── ...

## Cucumber

`Feature`:
•	file name should be in `skewer-case` with `.feature` extension

`Tag`:
•	tag name should be in `snake_case` with `@` prefix
