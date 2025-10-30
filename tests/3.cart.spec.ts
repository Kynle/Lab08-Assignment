import { test, expect } from "../fixtures/baseFixture";
import CartPage from "../pages/CartPage";
import { testData, users } from "../utils/dataLoader";

for (const userType of users) {
  test.describe(`Cart Page Tests with ${userType}`, () => {
    test.beforeEach(async ({ loginPage, productsPage }) => {
      await loginPage.goto();
      await loginPage.login(userType, testData.validPassword);
      await productsPage.addAllItems();
    });
    test("Compare Product prices with Cart prices ", async ({
      productsPage,
      cartPage,
    }) => {
      const productsTotal = await productsPage.calculateProductPrices();
      await cartPage.enterCart();
      const cartTotal = await cartPage.calculateCartTotal();
      await expect(productsTotal).toBeCloseTo(cartTotal, 2);
    });

    test("Inspect Products in the cart, and remove them.", async ({
      cartPage,
    }) => {
      await cartPage.enterCart();
      await cartPage.inspectingAndRemovingProducts();
    });

    test("Cart Items Persistence", async ({ cartPage }) => {
      await cartPage.enterCart();
      await cartPage.goBackToProductPage();
    });
  });
}
