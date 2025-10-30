import { Page, expect } from "@playwright/test";
import { locators, errorMessages } from "../utils/dataLoader";

export default class LoginPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/v1/index.html");
  }

  async login(username: string, password: string) {
    await this.page.locator(locators.usernameField).fill(username);
    await this.page.locator(locators.passwordField).fill(password);
    await this.page.getByRole("button", { name: locators.loginBtn }).click();
    await this.page.waitForURL("**/inventory.html");
  }

  async wrongCredentialsLogin(username: string, password: string) {
    await this.page.locator(locators.usernameField).fill(username);
    await this.page.locator(locators.passwordField).fill(password);
    await this.page.getByRole("button", { name: locators.loginBtn }).click();
    await expect(this.page.locator(locators.errMsg)).toHaveText(
      errorMessages.wrongCreds
    );
    console.log(errorMessages.wrongCreds);
  }

  async lockedOutUserLogin(username: string, password: string) {
    await this.page.locator(locators.usernameField).fill(username);
    await this.page.locator(locators.passwordField).fill(password);
    await this.page.getByRole("button", { name: locators.loginBtn }).click();
    await expect(this.page.locator(locators.errMsg)).toHaveText(
      errorMessages.lockedOutUser
    );
    console.log(errorMessages.lockedOutUser);
  }

  async openMenu() {
    await this.page.getByRole("button", { name: locators.openMenu }).click();
  }

  async logout() {
    await this.page.getByRole("link", { name: locators.logoutBtn }).click();
  }

  async assertProductPage() {
    await expect(this.page.getByText(locators.productsHeader)).toBeVisible();
  }
}
