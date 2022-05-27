Feature: Index Page shows basic elements

  Scenario: Index Page elements
    When I visit the index page
    Then I see "Shorten my URL" on the page
    And I see a button with the text "Submit"
    And I see an input field
