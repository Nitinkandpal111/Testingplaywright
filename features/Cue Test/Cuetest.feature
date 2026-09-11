@Cuetestflow
Feature: Login on the Cue website

  @TC_01
  Scenario Outline: The user login to the Cue Website and Upload all the files.
    When I redirect to the Cue Website
    Then I login in the Cue Website
    When I navigate to the "<game>" game
    Then I create a new game instance

    Examples:
      | game     |
      | Shootout |
