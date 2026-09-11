# @EcommerceFlow
# Feature: Login on the Ecommerce Page

#     @TC_01
#     Scenario: The user login to the Ecommerce Website and completes the purchase of an iphone.
#         When I redirect to the BStack Ecommerce Website
#         Then I login in the BStack Ecommerce
#         When I add the first iPhone to the cart
#         Then I proceed to checkout
#         Then I fill up the shipping Adsress
#             | First Name | Last Name | Address    | State | Postal code |
#             | Dew        | jones     | R34,NY,USA | NY    | 1200934     |
#         Then I should see order success message
#         Then I click on "Continue Shopping »" button
#         Then I click on "Logout" span
