const assert = require("chai").assert;
const { expect, Locator } = require("@playwright/test");
const fs = require("fs").promises;

class LoginPage {
  /**
   *
   * @param {import("playwright").Page} page
   */
  constructor(page) {
    this.page = page;
    this.locators = {
      usernameInput: '//input[@name="username"]',
      passwordInput: '//input[@name="password"]',
      loginButton: '//button[@type="submit"]',
      addemployeeButton: '//button[normalize-space()="Add"]',
      firstName: '//input[@name="firstName"]',
      lastName: '//input[@name="lastName"]',
      empUserName: '//label[text()="Username"]/following::input[1]',
      passwordFields: '//input[@type="password"]',
      toggleSwitch:
        '//span[@class="oxd-switch-input oxd-switch-input--active --label-right"]',
      employeeNameHeader: "//div[@class='orangehrm-edit-employee-name']//h6",
      nationalityDropdown:
        "//label[text()='Nationality']/following::div[contains(@class,'oxd-select-text-input')][1]",
      maritalStatusDropdown:
        "//label[text()='Marital Status']/following::div[contains(@class,'oxd-select-text-input')][1]",
      dateOfBirthInput:
        "//label[text()='Date of Birth']/following::input[@placeholder='yyyy-mm-dd']",
      tableCells: "//div[@class='oxd-table-cell oxd-padding-cell']",
      userDropdownIcon:
        "//i[@class='oxd-icon bi-caret-down-fill oxd-userdropdown-icon']",
      logoutLink: "//a[text()='Logout']",
    };
  }

  /* This function is taking the user to the login and entering all the deatils for the login purposee */
  async navigateToLoginScreen(username, password) {
    await page.goto(global.BASE_URL);

    if (!username || !password) {
      throw new Error("Login failed: Username and password are required.");
    }
    await page.fill(this.locators.usernameInput, username);
    await page.fill(this.locators.passwordInput, password);
    await page.click(this.locators.loginButton);
    await page.waitForLoadState("networkidle");
  }

  /* This function is used to verify the URL on the dashboard */
  async verifyOnDashboard() {
    const expectedUrl =
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
    try {
      const currentUrl = page.url();
      if (currentUrl !== expectedUrl) {
        throw new Error(
          `URL verification failed. Expected: ${expectedUrl}, but got: ${currentUrl}`
        );
      }
      console.log("Successfully verified: User is on the dashboard.");
    } catch (error) {
      console.error("Dashboard verification failed:", error);
      throw error;
    }
  }

  /* This function is used to navigate to the specific page */
  async navigateToPage() {
    const dashboardUrl =
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
    try {
      await page.goto(dashboardUrl);
      await page.waitForLoadState("networkidle");
      console.log("Navigation to dashboard successful.");
    } catch (error) {
      console.error("Failed to navigate to dashboard:", error);
      throw error;
    }
  }

  /* This function is used to click  the side bar option with text*/
  async clickSidebarOption(optionText) {
    const locator = `//span[text()='${optionText}']`;
    try {
      await page.waitForSelector(locator, { state: "visible", timeout: 5000 });
      await page.click(locator);
      console.log(`Clicked on "${optionText}" from the Sidebar`);
    } catch (error) {
      throw new Error(
        `Sidebar option "${optionText}" was not found or not visible`
      );
    }
  }

  /* This function is used to click on the button by text*/
  async clickButtonByText(optionText) {
    const locator = `//button[normalize-space()='${optionText}']`;
    try {
      await page.waitForSelector(locator, { state: "visible", timeout: 5000 });
      await page.click(locator);
      console.log(`Clicked on button "${optionText}"`);
    } catch (error) {
      throw new Error(
        `Button "${optionText}" was not found or not visible: ${error.message}`
      );
    }
  }

  /* This function is used to fill in the employee details */
  async fillEmployeeDetails(firstName, lastName) {
    try {
      await page.waitForSelector(this.locators.firstName, {
        state: "visible",
        timeout: 5000,
      });
      await page.fill(this.locators.firstName, firstName);

      await page.waitForSelector(this.locators.lastName, {
        state: "visible",
        timeout: 5000,
      });
      await page.fill(this.locators.lastName, lastName);

      console.log(
        `Employee details filled: First Name = "${firstName}", Last Name = "${lastName}"`
      );
    } catch (error) {
      throw new Error(`Failed to fill employee details: ${error.message}`);
    }
  }

  /* This function is used to turn on the toggle while filling in the employee details*/
  async toggleSwitch() {
    try {
      await page.waitForSelector(this.locators.toggleSwitch, {
        state: "visible",
        timeout: 5000,
      });
      await page.click(this.locators.toggleSwitch);
      console.log("Toggle button switched successfully.");
    } catch (error) {
      throw new Error(
        `Toggle switch was not found or not visible: ${error.message}`
      );
    }
  }

  /* This function fills in username and password (handles confirm password too) */
  async fillRandomUsernameAndPassword() {
    try {
      const randomString = Math.random().toString(36).substring(2, 9);
      const numericPart = Math.floor(100 + Math.random() * 900);
      const username = `user_${randomString}`;
      const password = `Pass_${randomString}${numericPart}`;

      global.generatedUsername = username;
      global.generatedPassword = password;

      await page.waitForSelector(this.locators.empUserName, {
        state: "visible",
        timeout: 5000,
      });
      await page.fill(this.locators.empUserName, username);

      await page.waitForSelector(this.locators.passwordFields, {
        state: "visible",
        timeout: 5000,
      });

      const passwordFields = await page.$$(this.locators.passwordFields);

      if (passwordFields.length < 2) {
        throw new Error("Password and Confirm Password fields not found!");
      }

      await passwordFields[0].fill(password);
      await passwordFields[1].fill(password);

      console.log(
        `Generated and filled Username "${username}" and Password "${password}" successfully.`
      );
    } catch (error) {
      throw new Error(
        `Failed to generate and fill random username/password: ${error.message}`
      );
    }
  }

  /* this function is used to fill in the employee id */
  async fillEmployeeId() {
    try {
      const employeeId = Math.floor(100000 + Math.random() * 900000).toString();

      const employeeIdInput =
        "//label[text()='Employee Id']/following::div//input[@class='oxd-input oxd-input--active']";

      await page.fill(employeeIdInput, employeeId);

      console.log(`Filled Employee ID: ${employeeId}`);

      this.generatedEmployeeId = employeeId;
      return employeeId;
    } catch (error) {
      throw new Error(`Failed to fill Employee ID: ${error.message}`);
    }
  }

  /* This function verifies the employee name and logs it */
  async verifyEmployeeName(expectedName) {
    try {
      await page.waitForSelector(this.locators.employeeNameHeader, {
        state: "visible",
        timeout: 20000,
      });

      const actualName = await page.textContent(
        this.locators.employeeNameHeader
      );

      console.log(`Employee name displayed: "${actualName}"`);

      if (actualName.trim() !== expectedName.trim()) {
        throw new Error(
          `Employee name mismatch. Expected: "${expectedName}", but found: "${actualName}"`
        );
      }

      console.log("Employee name verification successful!");
    } catch (error) {
      throw new Error(`Failed to verify employee name: ${error.message}`);
    }
  }

  /* This funciton is used fill in the employee details like nationality, marital status, DOB etc */
  async fillEmployeeInformation({ Nationality, MaritalStatus, DateOfBirth }) {
    try {
      if (Nationality) {
        await page.click(this.locators.nationalityDropdown);
        const nationalityOption = `//div[@role='option' and normalize-space()='${Nationality}']`;
        await page.click(nationalityOption);
        console.log(`✅ Selected Nationality: ${Nationality}`);
      }

      if (MaritalStatus) {
        await page.click(this.locators.maritalStatusDropdown);
        const maritalOption = `//div[@role='option' and normalize-space()='${MaritalStatus}']`;
        await page.click(maritalOption);
        console.log(`✅ Selected Marital Status: ${MaritalStatus}`);
      }

      if (DateOfBirth) {
        const dobLocator1 =
          "//label[text()='Date of Birth']/following::input[@placeholder='yyyy-mm-dd']";
        const dobLocator2 =
          "//label[text()='Date of Birth']/following::input[@placeholder='yyyy-dd-mm']";

        let dobInput;

        if (
          await page
            .locator(dobLocator1)
            .isVisible({ timeout: 5000 })
            .catch(() => false)
        ) {
          dobInput = dobLocator1;
          console.log("Using DOB field with format yyyy-mm-dd");
        } else if (
          await page
            .locator(dobLocator2)
            .isVisible({ timeout: 5000 })
            .catch(() => false)
        ) {
          dobInput = dobLocator2;
          console.log("Using DOB field with format yyyy-dd-mm");
        } else {
          throw new Error("Could not find Date of Birth input field");
        }

        await page.fill(dobInput, DateOfBirth);
        console.log(`Entered Date of Birth: ${DateOfBirth}`);
      }
    } catch (error) {
      throw new Error(`Failed to fill Employee Information: ${error.message}`);
    }
  }

  /* This function verifies the generated username in the admin table */
  async verifyGeneratedUsernameInTable() {
    try {
      if (!global.generatedUsername) {
        throw new Error(
          "No generated username found! Please run fillRandomUsernameAndPassword() first."
        );
      }

      await page.waitForSelector(this.locators.tableCells, {
        state: "visible",
        timeout: 20000,
      });

      const cells = await page.$$eval(this.locators.tableCells, (elements) =>
        elements.map((el) => el.innerText.trim())
      );

      if (cells.includes(global.generatedUsername)) {
        console.log(
          `✅ Username "${global.generatedUsername}" found in the table.`
        );
      } else {
        throw new Error(
          `❌ Username "${global.generatedUsername}" was not found in the table.`
        );
      }
    } catch (error) {
      throw new Error(`Failed to verify username in table: ${error.message}`);
    }
  }

  /* This function lets the user logout the application*/
  async logout() {
    try {
      await page.waitForSelector(this.locators.userDropdownIcon, {
        state: "visible",
        timeout: 10000,
      });
      await page.click(this.locators.userDropdownIcon);
      console.log("Clicked on user dropdown icon");

      await page.waitForSelector(this.locators.logoutLink, {
        state: "visible",
        timeout: 5000,
      });
      await page.click(this.locators.logoutLink);
      console.log("Clicked on Logout and logged out successfully");
    } catch (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  }
}

module.exports = { LoginPage };
