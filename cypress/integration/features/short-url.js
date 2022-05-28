import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const api = 'http://localhost:3000';

Given('I have a raw request body with:', function (json) {
  cy.log('JSON', json);
  this.setRequestBody(json);
});

Given(
  'I have a request body with:',
  /** @var {DataTable} */ function (dataTable) {
    cy.log('JSON', JSON.stringify(dataTable.rowsHash()));
    this.setRequestBody(dataTable.rowsHash());
  },
);

When('requesting POST {string}', function (endpoint) {
  cy.request({
    method: 'POST',
    url: api + endpoint,
    body: this.requestBody,
    failOnStatusCode: false,
  }).then((response) => this.setResponse(response));
});

Then('the request fails as a bad request', function () {
  expect(this.response.status).to.equal(400);
});

Then('the request returns status code {int}', function (number) {
  expect(this.response.status).to.equal(number);
});

Then('debug the response', function () {
  cy.log(
    JSON.stringify({
      body: this.response.body,
      requestBody: this.response.requestBody,
    }),
  );
  console.debug({ response: this.response });
});
