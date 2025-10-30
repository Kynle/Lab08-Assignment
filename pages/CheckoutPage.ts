import { Page, expect } from "@playwright/test";
import { locators, testData, errorMessages } from "../utils/dataLoader";

export default class CheckoutPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async validCustomerInformation() {
    await this.page
      .locator(locators.firstNameField)
      .fill(testData.validFirstName);
    await this.page
      .locator(locators.lastNameField)
      .fill(testData.validLastName);
    await this.page
      .locator(locators.postalCodeField)
      .fill(testData.validPostalCode);
    await this.page.getByRole("button", { name: locators.continueBtn }).click();
    await expect(this.page.getByText(locators.checkoutHeader)).toBeVisible();
  }

  async calculateCheckoutSummary() {
    const priceElements = this.page
      .locator(locators.checkoutContainer)
      .locator(locators.invetoryPrice);
    const count = await priceElements.count();
    let total = 0;

    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent();
      if (priceText) {
        const priceValue = parseFloat(priceText.replace("$", "").trim());
        total += priceValue;
      }
    }
    console.log(
      `The total of all products within on the checkout page is: $${total} with ${count} products.`
    );
    return total;
  }

  async completeCheckout() {
    await this.page.getByRole("link", { name: locators.finishBtn }).click();
    expect(this.page.getByRole("heading", { name: locators.orderCompleteMsg }));
  }

  async emptyCheckoutPrevention() {
    const finishButton = this.page.getByRole("link", {
      name: locators.finishBtn,
    });
    const isEnabled = await finishButton.isEnabled();

    if (isEnabled) {
      console.log(
        "Finish button is enabled, even though no products were selected!"
      );
      throw new Error(
        "Finish button should not be enabled when no products are in the cart."
      );
    } else {
      console.log("Finish button is correctly disabled when cart is empty");
    }
  }

  async cancleCheckout() {
    await this.page.getByRole("link", { name: locators.cancelBtn }).click();
  }

  async checkoutWithoutFN() {
    await this.page
      .locator(locators.lastNameField)
      .fill(testData.validLastName);
    await this.page
      .locator(locators.postalCodeField)
      .fill(testData.validPostalCode);
    await this.page.getByRole("button", { name: locators.continueBtn }).click();
    await expect(this.page.locator(locators.errMsg)).toHaveText(
      errorMessages.firstNameRequiredErr
    );
  }

  async checkoutWihoutLN() {
    await this.page
      .locator(locators.firstNameField)
      .fill(testData.validFirstName);
    await this.page
      .locator(locators.postalCodeField)
      .fill(testData.validPostalCode);
    await this.page.getByRole("button", { name: locators.continueBtn }).click();
    await expect(this.page.locator(locators.errMsg)).toHaveText(
      errorMessages.lastNameRequiredErr
    );
  }

  async checkoutWithoutPostalCode() {
    await this.page
      .locator(locators.firstNameField)
      .fill(testData.validFirstName);
    await this.page
      .locator(locators.lastNameField)
      .fill(testData.validLastName);
    await this.page.getByRole("button", { name: locators.continueBtn }).click();
    await expect(this.page.locator(locators.errMsg)).toHaveText(
      errorMessages.postalCodeRequiredErr
    );
  }
}
