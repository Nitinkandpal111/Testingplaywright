const { Given, When, Then, And } = require("@cucumber/cucumber");
const {
  EcommercePage,
} = require("../page/BStack Ecom Page/EcommercePage.js");

const ecomPage = new EcommercePage();

/*This step defintion is used to login on the OrangeHRM page and Login with valid creds, Then verify the correct URL */

When("I redirect to the BStack Ecommerce Website", async function () {
  await ecomPage.redirectToBStackDemo();
});

Then("I login in the BStack Ecommerce", async function () {
  await ecomPage.login();
});

When("I add the first iPhone to the cart", async function () {
  await ecomPage.addIphoneToCart();
});

Then("I proceed to checkout", async function () {
  await ecomPage.proceedToCheckout();
});

Then("I fill up the shipping Adsress", async function (dataTable) {
  const row = dataTable.rows()[0];
  const [firstName, lastName, address, state, postalCode] = row;

  await ecomPage.fillShippingAddress(
    firstName,
    lastName,
    address,
    state,
    postalCode
  );
  await ecomPage.submitShippingAddress();
});

Then("I should see order success message", async function () {
  await ecomPage.verifyOrderSuccess();
});

Then("I click on {string} button", async function (buttonText) {
  await ecomPage.clickButtonByText(buttonText);
});

Then("I click on {string} span", async function (spanText) {
  await ecomPage.clickSpanByText(spanText);
});
