import { test, expect } from "../fixtures/baseFixture";
import { testData, users } from "../utils/dataLoader";

for (const userType of users) {
  test.describe(`Checkout Tests with ${userType}`, () => {
    test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
      await loginPage.goto();
      await loginPage.login(userType, testData.validPassword);
    });

    test("Positive: Complete Checkout with items in the cart", async ({
      productsPage,
      cartPage,
      checkoutPage,
    }) => {
      await productsPage.addAllItems();
      await cartPage.enterCart();
      await cartPage.goToCheckout();
      await checkoutPage.validCustomerInformation();
      await checkoutPage.completeCheckout();
    });

    test("Compare prices on Checkout: Overview with Cart.", async ({
      productsPage,
      cartPage,
      checkoutPage,
    }) => {
      await productsPage.addAllItems();
      await productsPage.calculateProductPrices();
      await cartPage.enterCart();
      const cartTotal = await cartPage.calculateCartTotal();
      await cartPage.goToCheckout();
      await checkoutPage.validCustomerInformation();
      const checkoutTotal = await checkoutPage.calculateCheckoutSummary();
      await expect(checkoutTotal).toBeCloseTo(cartTotal, 2);
    });

    test("Negative: Attempt Checkout without products.", async ({
      productsPage,
      cartPage,
      checkoutPage,
    }) => {
      await productsPage.enterCart();
      await cartPage.goToCheckout();
      await checkoutPage.validCustomerInformation();
      await checkoutPage.emptyCheckoutPrevention();
    });

    test("Negative: Attempt Checkout without First Name", async ({
      productsPage,
      cartPage,
      checkoutPage,
    }) => {
      await productsPage.addAllItems();
      await productsPage.enterCart();
      await cartPage.goToCheckout();
      await checkoutPage.checkoutWithoutFN();
    });

    test("Negative: Attempt Checkout without Last Name", async ({
      productsPage,
      cartPage,
      checkoutPage,
    }) => {
      await productsPage.addAllItems();
      await productsPage.enterCart();
      await cartPage.goToCheckout();
      await checkoutPage.checkoutWihoutLN();
    });

    test("Negative: Attempt Checkout without Zip/Postal code", async ({
      productsPage,
      cartPage,
      checkoutPage,
    }) => {
      await productsPage.addAllItems();
      await productsPage.enterCart();
      await cartPage.goToCheckout();
      await checkoutPage.checkoutWithoutPostalCode();
    });
  });
}
