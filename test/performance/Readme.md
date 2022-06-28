# Description

A project using [artillery](https://www.artillery.io/) for performance tests

A good guide for starting with [artillery test cases](https://blog.appsignal.com/2021/11/10/a-guide-to-load-testing-nodejs-apis-with-artillery.html).

## Artillery Requirements:
Node.js v14 and above.   

## [Doc Guides](https://github.com/DigitalAssetPortal/nest-skeleton/tree/main/docs)
- [Nomenclature](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/docs/Nomenclature.md)
- [Structure](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/docs/Structure.md)

## How to run using npm?
``` bash
# main config file
$ npm run test:performance --path="config_file_path"

# run quick test on custom URL
$ npm run test:performance:quick --url="url_to_be_tested"

# custom environment
$ npm run test:performance:env --env="environment_name" --path="config_file_path"
$ npm run test:performance:env --env=dev --path=/test/example/scripts.yaml               #Example

# generate report 
$ npm run test:performance:report-generate --path="config_file_path" --fileName="test_file_name"
# The test_file_name will be created in JSON format.
# convert report into .html file
$ npm run test:performance:report-view --reportName="report_name" --fileName="test_file_name"
# The report_name will be created in HTML format. 

# Note: Quotes for options are not mandatory
```

## How to run globally?
To install artillery globally run the below command:
```bash
$ npm install -g artillery
```

``` bash
# development
$ artillery run config_file_path.yaml
# custom environment
$ artillery run --environment "environment_name" config_file_path.yaml
# generate report 
$ artillery --output custom_report_name.json config_file_path.yaml
# convert report into .html file
$ artillery report --output custom_report_webpage_name.html custom_report_name.json
```

## [Configuration](https://www.artillery.io/docs/guides/getting-started/writing-your-first-test#configuration)

#### A sample config file.
```bash
config:
  target: "https://example.com/api"         # Target url to test
  phases:
    - duration: 60                          # Phase 1
      arrivalRate: 5                        # Number of virtual users
      name: Warm up                         # Name of phase
    - duration: 120                         # Phase 2
      arrivalRate: 5                        # Number of virtual users
      rampTo: 50                            # Gradually increase virtual users to 100
      name: Ramp up load                    # Name of phase   
    - duration: 600                         # Phase 3
      arrivalRate: 50                       # Number of virtual users
      name: Sustained load                  # Name of phase        
```

## [Scenarios](https://www.artillery.io/docs/guides/getting-started/writing-your-first-test#configuration)

#### A sample config file with scenarios.

```bash
config:
  target: "http://localhost:3000"           # Target url to test
  phases:
    - duration: 60                          # Phase 1   
      arrivalRate: 20                       # Number of virtual users
      name: "Warming up"                    # Name of phase
    - duration: 240                         # Phase 2
      arrivalRate: 20                       # Number of virtual users
      rampTo: 100                           # Gradually increase virtual users to 100
      name: "Ramping up"                    # Name of phase
    - duration: 500                         # Phase 3
      arrivalRate: 100                      # Number of virtual users
      name: "Sustained load"                # Name of phase
 
scenarios:                          
  - name: "Sign up flow"                    # Scenario 1 -- Name of Scenario
    flow:                                   # Steps that each virtual user takes
      - get:                                # Get request
          url: "/"                          # Request at URL
      - think: 1                            # Wait period after the request (1 Sec)
      - get:                                # Get request
          url: "/pricing"                   # Request at URL
      - think: 2                            # Wait period after the request (2 Sec)
      - get:                                # Get request
          url: "/signup"                    # Request at URL
      - think: 3                            # Wait period after the request (1 Sec)
      - post:                               # Post request
          url: "/signup"                    # Request at URL
          json:                             # JSON data to send while post request
            email: "dummy@gmail.com"        # Dummy email 
            password: "dummpassword"        # Dummy password
```

## For more detailed information about all the keywords of artillery, go to this [link](https://www.artillery.io/docs/guides/guides/test-script-reference#overview).
