Feature: Index Page shows basic elements

  Scenario: Index Page elements are visible
    When I visit the index page
    Then I see "Shorten my URL" on the page
    And I see a button with the text "Submit"
    And I see an input field

  Scenario: Using the input field to create a shortened url
    Given I visit the index page
    And I fill "http://google.de" into the field "url"
    When I click on the submit button
    Then I see the success container

  Scenario: Error when providing invalid values
    Given I visit the index page
    And I fill "adasddsdsdg" into the field "url"
    When I click on the submit button
    Then I see the error container
