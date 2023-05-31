# URL Shortener

A simple implementation of a URL Shortener Service build with NestJS and including a very basic user interface.

## How to use

```bash
$ npm install
$ npm run start
```

After the local server is running you can:

- View the [local server](http://localhost:3000/)
- View the [API Documentation](http://localhost:3000/docs/)

## List of notable npm scripts

```bash
# Run unit tests
$ npm run test:unit

# Show test coverage
$ npm run test:cov

# Lint the code
$ npm run lint

# Open Cypress to allow triggering the E2E test suites
$ npm run test:e2e

# Run all E2E tests in headless mode
$ npm run test:e2e:ci
```

## How to run the Load Tests

I used K6 for the load tests, please refer to the [Official Documentation](https://k6.io/docs/getting-started/installation/) to find out how to install it on your system.

For Mac with Homebrew this is enough:
```bash
brew install k6
```

Given you use a Mac, afterwards you can run these tests
```bash
# Test Frontend, Encode and Decode Endpoints
npm run load-test:all

# The decode endpoint suffers the most from heavy load, so I added another one specifically to ramp up load
npm run load-test:decode
```

## Screenshots

### Frontend

![](screenshots/frontend.png)

### Test Coverage
![](screenshots/test-coverage.png)

### Result of E2E Test Suites
![](screenshots/results-e2e.png)

### Result of running `npm run load-test:all`

Obviously the numbers highly depend on the used machine.

![](screenshots/load-test-all.png)

### Github Workflow

To ensure every merged feature branch during development doesn't break something
I created a github workflow.

![](screenshots/github-workflow.png)
