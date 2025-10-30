import { test } from "../fixtures/baseFixture";
import ProductsPage from "../pages/ProductsPage";
import { testData, users } from "../utils/dataLoader";

for (const userType of users) {
  test.describe(`End to End test of Swag Labs with: ${userType}`, () => {
    test("A complete user flow from login, adding products to cart to checkout and logout.", async ({
      loginPage,
      productsPage,
      cartPage,
      checkoutPage,
    }) => {
      await loginPage.goto();
      await loginPage.login(userType, testData.validPassword);
      await productsPage.addAllItems();
      await productsPage.enterCart();
      await cartPage.goToCheckout();
      await checkoutPage.validCustomerInformation();
      await checkoutPage.completeCheckout();
      await loginPage.openMenu();
      await loginPage.logout();
    });
  });
}
