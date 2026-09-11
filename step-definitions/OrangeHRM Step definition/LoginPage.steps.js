const { Given, When, Then, And } = require("@cucumber/cucumber");
const { LoginPage } = require("../../page/OrangeHRM Page/LoginPage.js");

const loginpage = new LoginPage();

Given("I am on the Home screen", async () => {
  const username = process.env.OrangeHRM_USERNAME;
  const password = process.env.OrangeHRM_PASSWORD;
  await loginpage.navigateToLoginScreen(username, password);
  await loginpage.verifyOnDashboard();
});

When("I navigate to the Dashboard page", async () => {
  await loginpage.navigateToPage();
});

When("I click on the {string} option from the Sidebar", async (optionText) => {
  await loginpage.clickSidebarOption(optionText);
});

When("I click on the {string} button", async (optionText) => {
  await loginpage.clickButtonByText(optionText);
});

When(
  /^I fill the employee details First Name "([^"]*)" and Last Name "([^"]*)"$/,
  async (firstName, lastName) => {
    await loginpage.fillEmployeeDetails(firstName, lastName);
  }
);

Then("I fill in the employee id", async () => {
  await loginpage.fillEmployeeId();
});

When("I switch on the toggle button", async () => {
  await loginpage.toggleSwitch();
});

Then("I fill in random username and password", async () => {
  await loginpage.fillRandomUsernameAndPassword();
});

Then("I should see the employee name {string}", async (expectedName) => {
  await loginpage.verifyEmployeeName(expectedName);
});

Then(
  "I select the options for the Employee Information",
  async function (dataTable) {
    const row = dataTable.rows()[0];
    const [Nationality, MaritalStatus, DateOfBirth] = row;

    await loginpage.fillEmployeeInformation({
      Nationality,
      MaritalStatus,
      DateOfBirth,
    });
  }
);

Then("I should see the generated username in the table", async () => {
  await loginpage.verifyGeneratedUsernameInTable();
});

Then("I log out from the application", async () => {
  await loginpage.logout();
});
