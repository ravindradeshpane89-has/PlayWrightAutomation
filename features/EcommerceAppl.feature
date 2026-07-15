Feature: Validate E-commerce Application functionality.
@Regression
Scenario:Placing the order.

Given user logged into ecommerce applocation with "Rav.desh@resp.com" and "Learning1@3"
When user add product "ZARA COAT 3" to cart
Then product "ZARA COAT 3" is displayed on cart page
When user enter valid details along with email "Rav.desh@resp.com" and places the order
Then order details should be displayed on order successful page
And  order details should be displayed on order history page