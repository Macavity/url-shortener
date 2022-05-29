import { apiUrl } from '../config';

Cypress.Commands.add('resetCache', () => {
  cy.request('DELETE', apiUrl + '/short-url/reset');
});
