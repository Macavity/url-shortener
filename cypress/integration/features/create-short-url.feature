Feature: Create a short url entry

  Scenario: Endpoint fails with empty request body
    When sending a "POST" request to "/short-url/encode"
    Then the request fails as a bad request

  Scenario: Endpoint fails with invalid request body
    Given I have a request body with:
      | name | Invalid property |
    When sending a "POST" request to "/short-url/encode"
    Then the request fails as a bad request

  Scenario: Endpoint responds with Created when sent a valid DTO
    Given I have a request body with:
      | original | https://codesubmit.io/library/react |
    When sending a "POST" request to "/short-url/encode"
    Then the request returns status code 201

  Scenario: Endpoint responds with Unprocessable Entity when given an invalid URL
    Given I have a request body with:
      | original | ftp://codesubmit |
    When sending a "POST" request to "/short-url/encode"
    Then the request returns status code 422

    Given I have a request body with:
      | original | "Horst Maier" |
    When sending a "POST" request to "/short-url/encode"
    Then the request returns status code 422
