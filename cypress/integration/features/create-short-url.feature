Feature: Create a short url entry

  Background:
    Given the data is clean

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

  Scenario: The endpoint supports complex url examples
    When encoding "https://www.google.com/"
    Then the response field "original" equals "https://www.google.com/"

    When encoding "https://www.google.com/page/subpage.html"
    Then the response field "original" equals "https://www.google.com/page/subpage.html"

    When encoding "https://www.google.com/page/subpage.html?param=a&b=c&hUl=%C3%A4%C3%B6%C3%BC"
    Then the response field "original" equals "https://www.google.com/page/subpage.html?param=a&b=c&hUl=%C3%A4%C3%B6%C3%BC"

  Scenario: The endpoint fails when trying to save with a short code which is already used
    When encoding "https://www.google.com/first-page" as "abc1fg"
    Then the request returns status code 201

    When encoding "https://www.google.com/second-page" as "abc1fg"
    Then the request returns status code 400
