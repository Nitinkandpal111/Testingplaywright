const { expect } = require("@playwright/test");
const { generate } = require("random-words");
const path = require("path");

class ShootoutPage {
  /**
   * @param {import("playwright").Page} page
   */
  constructor(page) {
    this.page = page || global.page;
    //this.gameName = null;
    this.locators = {
      usernameInput: "#P0-0",
      passwordInput: "#P0-1",
      loginButton: "#P0-2",
      gameLink: "text=Shootout",
      createGameButton: '[aria-label="Add Configuration"]',
      SaveButton: "//button[(contains(text(),'Save'))]",
      InputinstanceName: '//input[@name="value"]',
    };
  }

  get shootoutFrame() {
    return this.page.frameLocator('iframe[src*="/games/shootout/admin"]');
  }

  async navigateToLoginScreen(username, password) {
    const targetUrl = "https://nkandpal.stagingdxp.com/admin/#/";

    await this.redirectToCueWebsite();

    if (!username || !password) {
      throw new Error("Login failed: Username and password are required.");
    }

    await this.loginToCueWebsite(username, password);
  }

  async redirectToCueWebsite() {
    const targetUrl = "https://nkandpal.stagingdxp.com/admin/#/";
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
    username = process.env.CUE_USERNAME,
    password = process.env.CUE_PASSWORD,
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
        `Failed to navigate to game "${gameName}": ${error.message}`,
      );
    }
  }

  async createNewGameInstance() {
    const gameInstanceName = `New Basketball Game ${generate({ minLength: 2, maxLength: 4 })}`;
    try {
      const frame = this.shootoutFrame;

      const createButton = frame.locator(this.locators.createGameButton);

      await createButton.waitFor({ state: "visible", timeout: 30000 });
      await createButton.scrollIntoViewIfNeeded();
      await createButton.click();
      console.log("Clicked on the + button next to Instances");
      await frame.locator('[aria-haspopup="listbox"]').click();

      await frame.getByRole("option", { name: "Basketball" }).click();

      await frame
        .locator(this.locators.InputinstanceName)
        .fill(gameInstanceName);
      await frame.locator(this.locators.SaveButton).click();
    } catch (error) {
      console.error("createNewGameInstance failed:", error.stack);
      throw new Error(`Failed to create a new game instance: ${error.message}`);
    }
    return gameInstanceName;
  }

  async navigateAndUploadFiles(gameInstanceName) {
    try {
      const frame = this.shootoutFrame;

      await frame
        .locator(
          `//h6[contains(text(),'${gameInstanceName}')]/../../..//button[contains(text(),'Design')]`,
        )
        .click();

      //const filePath = "D:\\Playwrightudittest\\playwrightTest\\TestData\\Home.webp";
      const filePath = path.resolve(
            process.cwd(),
            "TestData",
            "Home.webp"
        );


      const images = [
        "shootout-basketball-game-title-image",
        "shootout-basketball-team-logo-image",
        "shootout-basketball-sponsor-logo-image",
        "shootout-basketball-loading-multi-image",
        "shootout-basketball-background-image",
        "shootout-basketball-mobile-leaderboard-background-image",
        "shootout-basketball-mainboard-background-image",
        "shootout-basketball-mainboard-1-multi-image",
        "shootout-basketball-mainboard-2-multi-image",
        "shootout-basketball-court-key-logo-image",
        "shootout-basketball-endline-logo-image",
        "shootout-basketball-partition-image",
        "shootout-basketball-how-to-play-multi-image",
        "shootout-basketball-rules-screen-multi-image",
      ];

      for (const ariaLabel of images) {
        await this.uploadImage(frame, ariaLabel, filePath);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async uploadImage(frame, ariaLabel, filePath) {
    await frame.locator(`(//div[@aria-label="${ariaLabel}"]//div)[5]`).click();

    await frame.locator('input[type="file"]').setInputFiles(filePath);

    console.log(`Uploaded image: ${ariaLabel}`);

    await frame.locator(this.locators.SaveButton).click();
  }
}

module.exports = { ShootoutPage };
