Feature: Retrieve Short URL

  Background:
    Given the data is clean

  Scenario: Endpoint fails with empty url parameter
    When sending a "GET" request to "/short-url/decode"
    Then the request returns status code 404

  Scenario: Endpoint return Not found when given a not existing short code
    When sending a "GET" request to "/short-url/decode/not-saved"
    Then the request returns status code 404

  Scenario: Endpoint returns a ShortUrl DTO when given an existing short code
    Given there are short url entries with:
      | short | original            |
      | abc2d | https://google.com/ |
      | efg1h | https://google.com/ |

    When sending a "GET" request to "/short-url/decode/abc2d"
    Then the request returns status code 200
    And the response contains:
      | field    | value               |
      | original | https://google.com/ |
      | short    | abc2d               |

    When sending a "GET" request to "/short-url/decode/efg1h"
    Then the request returns status code 200
    And the response contains:
      | field    | value               |
      | original | https://google.com/ |
      | short    | efg1h               |

  Scenario: Ensure the tests are atomic
    When sending a "GET" request to "/short-url/decode/abc2d"
    Then the request returns status code 404
