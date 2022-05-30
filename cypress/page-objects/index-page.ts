import Cypress from 'cypress';

declare const cy: Cypress.cy & CyEventEmitter;

export class IndexPage {
  static visit() {
    cy.visit('/');
  }

  static getFieldBySelector(fieldSelector: string) {
    return cy.get(`[data-cy="${fieldSelector}"]`);
  }

  static getSuccessContainer() {
    return cy.get(`[data-cy="success"]`);
  }

  static getErrorContainer() {
    return cy.get(`[data-cy="error"]`);
  }

  static getSubmitButton() {
    return cy.get(`[data-cy="submit"]`);
  }
}
