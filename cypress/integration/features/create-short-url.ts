import { DataTable, Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I have a raw request body with:', function (json) {
  cy.log('JSON', json);
  this.setRequestBody(json);
});

Given('I have a request body with:', function (dataTable: DataTable) {
  cy.log('JSON', JSON.stringify(dataTable.rowsHash()));
  this.setRequestBody(dataTable.rowsHash());
});
