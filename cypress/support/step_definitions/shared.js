import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { apiUrl } from '../../config';

Given('the data is clean', async () => {
  cy.resetCache();
});

Given(
  'there are short url entries with:',
  /** @param {DataTable} dataTable */ function (dataTable) {
    //cy.log('JSON', JSON.stringify(dataTable.hashes()));
    const url = apiUrl + '/short-url/encode';
    for (const row of dataTable.hashes()) {
      // cy.log(`POST ${url}`);
      cy.request({
        method: 'POST',
        url,
        body: {
          original: row.original,
          short: row.short,
        },
      });
    }
  },
);

When('I visit {string}', (url) => {
  cy.visit(String(url));
});

When('sending a {string} request to {string}', function (method, endpoint) {
  cy.request({
    method: method,
    url: apiUrl + endpoint,
    body: this.requestBody,
    failOnStatusCode: false,
  }).then((response) => this.setResponse(response));
});

When('requesting GET {string}', function (endpoint) {
  cy.request({
    method: 'GET',
    url: apiUrl + endpoint,
    failOnStatusCode: false,
  }).then((response) => this.setResponse(response));
});

Then('I see {string} on the page', (text) => {
  cy.get('body').should('contain.text', text);
});

Then('the request fails as a bad request', function () {
  expect(this.response.status).to.equal(400);
});

Then('the request returns status code {int}', function (number) {
  expect(this.response.status).to.equal(number);
});

Then(
  'the response contains:',
  /** @param {DataTable} dataTable */
  function (dataTable) {
    for (const row of dataTable.hashes()) {
      const received = this.response.body[row.field];
      const expected = row.value;

      expect(received).to.equal(expected);
    }
  },
);

Then('debug the response', function () {
  cy.log(
    JSON.stringify({
      body: this.response.body,
      requestBody: this.response.requestBody,
    }),
  );
  console.debug({ response: this.response });
});
