Feature: Error Validation for Ecommerce2 App
@Error
@Regression
Scenario Outline: Validate error messages on Ecommerce2 app

Given user logged into Ecommerce2 app with "<username>" and "<password>"
Then error message should get displayed
Examples:
    | username | password | 
    | ravindra |Learning1@3 |
    | ravindra12|Selenium1@3|


