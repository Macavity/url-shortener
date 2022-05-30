/// <reference types="cypress" />
import { apiUrl } from '../config';

declare global {
  namespace Cypress {
    interface Chainable {
      resetCache(value: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('resetCache', () => {
  cy.request('DELETE', apiUrl + '/short-url/reset');
});
