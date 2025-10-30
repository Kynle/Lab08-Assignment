import { test } from "../fixtures/baseFixture";
import ProductsPage from "../pages/ProductsPage";
import { testData, users } from "../utils/dataLoader";

for (const userType of users) {
  test.describe(`Products Page Tests with ${userType}`, () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(userType, testData.validPassword);
    });

    test("Adding and Removing all Products on Products Page", async ({
      page,
    }) => {
      const productPage = new ProductsPage(page);
      await productPage.addAllItems();
      await productPage.removeAllItems();
    });

    test("Inspecting and Adding all Products", async ({ page }) => {
      const productPage = new ProductsPage(page);

      await productPage.inspectAndAddProducts();
    });

    test("Products Filtering", async ({ page }) => {
      const productPage = new ProductsPage(page);

      await productPage.filterByPriceHigh();
      await productPage.filterByPriceLow();
      await productPage.filterByNameA_Z();
      await productPage.filterByNameZ_A();
    });
  });
}
