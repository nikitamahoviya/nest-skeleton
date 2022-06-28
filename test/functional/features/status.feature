@status @wip
Feature: Get service status

    @get_status
    Scenario: Get status
        Given User sets correct parameters if any
        When User makes a Get Http Request for status
        Then User gets a response for status request