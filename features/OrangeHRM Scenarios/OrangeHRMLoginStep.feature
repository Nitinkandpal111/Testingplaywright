# @LogInModule @OrangeHRMLogin
# Feature: Login on the Page

#     Background: User is logged in and navigates to the OrangeHRM Page
#         Given I am on the Home screen

#     @TC_01
#     Scenario: Create an Employee on the OrangeHRM PIM and then verify in the Admin panel
#         When I navigate to the Dashboard page
#         Then I click on the "PIM" option from the Sidebar
#         Then I click on the "Add" button
#         When I fill the employee details First Name "John" and Last Name "David"
#         Then I fill in the employee id 
#         When I switch on the toggle button
#         Then I fill in random username and password
#         Then I click on the "Save" button
#         Then I should see the employee name "John David"
#         Then I select the options for the Employee Information
#             | Nationality | Marital Status | Date of Birth |
#             | Indian      | Single         | 1998-02-02    |
#         Then I click on the "Admin" option from the Sidebar
#         Then I should see the generated username in the table
#         Then I log out from the application