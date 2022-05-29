import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I visit the index page', () => {
  cy.visit('/');
});

Then('I see a button with the text {string}', (text) => {
  cy.get('button').should('contain', text);
});
Then('I see an input field', () => {
  cy.get('input').should('be.visible');
});
