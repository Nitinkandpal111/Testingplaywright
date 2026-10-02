@Cuetestflow
Feature: Login on the Cue website

  @TC_01
  Scenario Outline: The user login to the Cue Website and Upload all the files.
    When I redirect to the Cue Website
    Then I login in the Cue Website
    When I navigate to the "Shootout" game
    Then I create a new game instance
    When I navigate to the Design tab and upload all the files