const { When, Then } = require("@cucumber/cucumber");
const { ShootoutPage } = require("../../page/Cue Page/ShootoutPage.js");
let gameInstanceName;

When("I redirect to the Cue Website", async function () {
  const shootoutPage = new ShootoutPage(global.page);
  await shootoutPage.redirectToCueWebsite();
});

Then("I login in the Cue Website", async function () {
  const shootoutPage = new ShootoutPage(global.page);
  await shootoutPage.loginToCueWebsite();
});

When("I navigate to the {string} game", async function (gameName) {
  const shootoutPage = new ShootoutPage(global.page);
  await shootoutPage.navigateToGame(gameName);
});

Then("I create a new game instance", async function () {
  const shootoutPage = new ShootoutPage(global.page);
  gameInstanceName = await shootoutPage.createNewGameInstance();
});

When(
  "I navigate to the Design tab and upload all the files",
  async function () {
    const shootoutPage = new ShootoutPage(global.page);
    await shootoutPage.navigateAndUploadFiles(gameInstanceName);
  },
);