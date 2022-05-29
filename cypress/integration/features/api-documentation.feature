Feature: API Documentation

  Scenario: The API Documentation page is accessible
    When I visit "/docs"
    Then I see "URL Shortener API" on the page
