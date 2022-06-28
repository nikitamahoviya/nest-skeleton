# Description

A project using cucumber bdd for end to end functional tests for the api's

## Installation

```bash
$ npm install
```

## Commands

```bash
# run tests
$ npm run test:functional

# run tests with publish reports (includes flag --publish)
$ npm run test:functional:publish

# run tests with tag control
$ npm run test:functional:tags --tags="{tags_string}"
# Usage: npm run test:functional:tags --tags="{@some_tag or @other_tag and (not @do_not_run_tag)}"
```

## [Doc Guides](https://github.com/DigitalAssetPortal/nest-skeleton/tree/main/docs)
- [Nomenclature](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/docs/Nomenclature.md)
- [Structure](https://github.com/DigitalAssetPortal/nest-skeleton/blob/main/docs/Structure.md)

features - BDD style test cases (features (files) > scenarios > steps [Given, When, Then, And])
step-definitions - Implementation and assertions for the features

## Help Guide
- [Tag Expressions](https://cucumber.io/docs/cucumber/api/#tag-expressions)
