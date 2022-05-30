import {
  DataTable,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';
import { apiUrl } from '../../config';

Given('the data is clean', async () => {
  // @ts-ignore
  cy.resetCache();
});

Given('there are short url entries with:', function (dataTable: DataTable) {
  const url = apiUrl + '/short-url/encode';
  for (const row of dataTable.hashes()) {
    cy.request({
      method: 'POST',
      url,
      body: {
        original: row.original,
        short: row.short,
      },
    });
  }
});

When('I visit {string}', (url: string) => {
  cy.visit(url);
});

When(
  'sending a {string} request to {string}',
  function (method: string, endpoint: string) {
    cy.request({
      method: method,
      url: apiUrl + endpoint,
      body: this.requestBody,
      failOnStatusCode: false,
    }).then((response) => this.setResponse(response));
  },
);

When('requesting GET {string}', function (endpoint: string) {
  cy.request({
    method: 'GET',
    url: apiUrl + endpoint,
    failOnStatusCode: false,
  }).then((response) => this.setResponse(response));
});

Then('I see {string} on the page', (text: string) => {
  cy.get('body').should('contain.text', text);
});

Then('the request fails as a bad request', function () {
  expect(this.response.status).to.equal(400);
});

Then('the request returns status code {int}', function (number: number) {
  expect(this.response.status).to.equal(number);
});

/**
 * Compare a single field with an expected value
 */
Then(
  'the response field {string} equals {string}',
  function (field: string, text: string) {
    const received = this.response.body[field];

    expect(received).to.equal(text);
  },
);

/**
 * Compare multiple fields provided in a table
 */
Then('the response contains:', function (dataTable: DataTable) {
  for (const row of dataTable.hashes()) {
    const received = this.response.body[row.field];
    const expected = row.value;

    expect(received).to.equal(expected);
  }
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
