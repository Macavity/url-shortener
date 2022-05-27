# URL Shortener

## Features

[] Page which can be used to target the url shortener service
[] Variant 1: The user provides a slug which is used for the shortened url
[] Variant 2: The services creates a random slug
[] Endpoint which saves the slug to the storage
[] Endpoint which decodes a given slug to a URL

### Requirements

- The shortened url should be shorter than the original url

### Possible additional features

- Provide metrics like most visited links
- Error monitoring
- 

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

## Test

```bash
# all tests
$ npm run test

# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
