const assert = require("chai").assert;
const { expect } = require("@playwright/test");

class ShootoutPage {
  /**
   * @param {import("playwright").Page} page
   */
  constructor(page) {
    this.page = page || global.page;
    this.locators = {
      usernameInput: "#P0-0",
      passwordInput: "#P0-1",
      loginButton: "#P0-2",
      gameLink: "text=Shootout",
      createGameButton: '[data-testid="AddIcon"]',
    };
  }

  async navigateToLoginScreen(username, password) {
    const targetUrl = "https://nkandpal.cuelive.com/admin/#/";

    await this.redirectToCueWebsite();

    if (!username || !password) {
      throw new Error("Login failed: Username and password are required.");
    }

    await this.loginToCueWebsite(username, password);
  }

  async redirectToCueWebsite() {
    const targetUrl = "https://nkandpal.cuelive.com/admin/#/";
    try {
      await this.page.goto(targetUrl, { waitUntil: "domcontentloaded" });
      await this.page.waitForSelector(this.locators.usernameInput, {
        state: "visible",
        timeout: 30000,
      });
      await this.page.setViewportSize({ width: 1366, height: 599 });
      console.log(`Redirected successfully to: ${targetUrl}`);
    } catch (error) {
      throw new Error(`Failed to redirect to Cue Website: ${error.message}`);
    }
  }

  async loginToCueWebsite(
    username = process.env.CUE_USERNAME || "nkandpal",
    password = process.env.CUE_PASSWORD || "I0MjRHzw8h"
  ) {
    try {
      
      await this.page.locator(this.locators.usernameInput).fill(username);
      await this.page.locator(this.locators.passwordInput).fill(password);
      await this.page.locator(this.locators.loginButton).click();

      await this.page.waitForTimeout(2000);
      const bodyText = (await this.page.textContent("body")) || "";

      if (bodyText.toLowerCase().includes("invalid credentials")) {
        throw new Error("Cue credentials were rejected by the application");
      }

      console.log("Successfully logged in to the Cue Website");
    } catch (error) {
      throw new Error(`Cue website login failed: ${error.message}`);
    }
  }

  async navigateToGame(gameName) {
    try {
      const gameLocator = this.page.locator(`text=${gameName}`).first();
      await gameLocator.waitFor({ state: "visible", timeout: 15000 });
      await gameLocator.click();
      // Wait a moment for the page to update
      await this.page.waitForTimeout(2000);
      console.log(`Navigated to the "${gameName}" game`);
    } catch (error) {
      throw new Error(
        `Failed to navigate to game "${gameName}": ${error.message}`
      );
    }
  }

  async createNewGameInstance() {
    try {
      const frame = await this.page.frameLocator("//iframe[contains(@src,'https://nkandpal.cuelive.com/games/shootout/admin')]")
      const createButton = await  frame.locator(this.locators.createGameButton);

      await createButton.waitFor({ state: "visible", timeout: 30000 });
      await createButton.scrollIntoViewIfNeeded();
      await createButton.click();
      console.log("Clicked on the + button next to Instances");
       await page.locator('#app iframe').contentFrame().locator('[aria-haspopup="listbox"]').click();

  await page.locator('#app iframe').contentFrame().getByRole('option', { name: 'Basketball' }).click();
  await page.locator('#app iframe').contentFrame().locator('#P-16999251652').click();
  await page.locator('#app iframe').contentFrame().locator('#P-16999251652').fill('New Basketball 2');
  await page.locator('#app iframe').contentFrame().getByRole('button', { name: 'shootout-configurations-add-edit-popup-save-button' }).click();
  await page.locator('#app iframe').contentFrame().locator('#P-4987285462').click();
  await page.locator('#app iframe').contentFrame().getByLabel('shootout-basketball-game-').locator('div').nth(4).click();
  await page.locator('#app iframe').contentFrame().getByRole('button', { name: 'Choose File' }).click();
  await page.locator('#app iframe').contentFrame().getByRole('button', { name: 'Choose File' }).setInputFiles('signature.png');
  await page.locator('#app iframe').contentFrame().getByRole('button', { name: 'Aspect Ratio Lock' }).click();
  await page.locator('#app iframe').contentFrame().getByRole('button', { name: 'Save' }).click();
  //await expect(page.locator('#app iframe').contentFrame().locator('.MuiBox-root.css-w0xeu4')).toBeVisible();

      
    } catch (error) {
      console.error("createNewGameInstance failed:", error.stack);
      throw new Error(`Failed to create a new game instance: ${error.message}`);
    }
   
  }
}

module.exports = { ShootoutPage };