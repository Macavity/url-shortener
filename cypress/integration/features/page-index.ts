import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { IndexPage } from '../../page-objects/index-page';

When('I visit the index page', () => {
  IndexPage.visit();
});

When(
  'I fill {string} into the field {string}',
  (value: string, fieldSelector: string) => {
    IndexPage.getFieldBySelector(fieldSelector).type(value);
  },
);

When('I click on the submit button', (fieldSelector: string) => {
  IndexPage.getSubmitButton().click();
});

Then('I see a button with the text {string}', (text) => {
  cy.get('button').should('contain', text);
});

Then('I see an input field', () => {
  cy.get('input').should('be.visible');
});

Then('I see the success container', (fieldSelector: string) => {
  IndexPage.getSuccessContainer().should('be.visible');
});

Then('I see the error container', (fieldSelector: string) => {
  IndexPage.getErrorContainer().should('be.visible');
});
