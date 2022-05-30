import {
  DataTable,
  Given,
  When,
} from '@badeball/cypress-cucumber-preprocessor';
import { apiUrl } from '../../config';

Given('I have a raw request body with:', function (json) {
  cy.log('JSON', json);
  this.setRequestBody(json);
});

Given('I have a request body with:', function (dataTable: DataTable) {
  cy.log('JSON', JSON.stringify(dataTable.rowsHash()));
  this.setRequestBody(dataTable.rowsHash());
});

When('encoding {string}', function (string: string) {
  cy.request({
    method: 'POST',
    url: apiUrl + '/short-url/encode',
    body: {
      original: string,
    },
    failOnStatusCode: false,
  }).then((response) => this.setResponse(response));
});

When('encoding {string} as {string}', function (string: string, code: string) {
  cy.request({
    method: 'POST',
    url: apiUrl + '/short-url/encode',
    body: {
      original: string,
      short: code,
    },
    failOnStatusCode: false,
  }).then((response) => this.setResponse(response));
});
