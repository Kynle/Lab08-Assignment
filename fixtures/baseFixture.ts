import { Page, test as baseTest } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import { errorMessages, testData } from "../utils/dataLoader";

type MyFixture = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedUser: Page;
};

type dataFixtgure = {
  testData: typeof import("../test_data/testData.json");
  errorMessage: typeof import("../locators/errorMessages.json");
};

export const test = baseTest.extend<MyFixture & dataFixtgure>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),

  productsPage: async ({ page }, use) => use(new ProductsPage(page)),

  cartPage: async ({ page }, use) => use(new CartPage(page)),

  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),

  authenticatedUser: async ({ page }, use) => use(page),

  testData: async ({}, use) => {
    await use(testData);
  },
  errorMessage: async ({}, use) => {
    await use(errorMessages);
  },
});

export { expect } from "@playwright/test";
