import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I visit {string}', (url) => {
  cy.visit(String(url));
});

Then('I see {string} on the page', (text) => {
  cy.get('body').should('contain.text', text);
});
