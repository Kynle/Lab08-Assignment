import { Page, expect } from "@playwright/test";
import { locators } from "../utils/dataLoader";

export default class CartPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async enterCart() {
    await this.page.locator(locators.cartBtn).click();
  }

  async calculateCartTotal() {
    const priceElements = this.page
      .locator(locators.cartContainer)
      .locator(locators.inventoryPrice);
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
      `The total of all products within the cart is: $${total} with ${count} products.`
    );
    return total;
  }
  async assertCartTotal(epxectedTotal: number) {
    const actualTotal = await this.calculateCartTotal();
    await expect(actualTotal).toBeCloseTo(epxectedTotal, 2);
  }

  async inspectingAndRemovingProducts() {
    const cartItems = this.page.locator(locators.cartContainerItems);
    const count = await cartItems.count();
    let removedCount = 0;

    for (let i = 0; i < count; i++) {
      const currentItem = this.page.locator(locators.cartContainerItems).nth(i);
      const productLink = currentItem.locator(locators.productTitleLink);
      const removeBtn = this.page.getByRole("button", {
        name: locators.removeItem,
      });
      const productName = await productLink.innerText();
      console.log(`Removing product: ${productName} from the cart.`);

      await productLink.click();

      if (await removeBtn.isVisible()) {
        await removeBtn.click();
        removedCount++;
      }
      await expect(
        this.page.getByRole("button", { name: locators.addItem })
      ).toBeVisible();
      await this.page.locator(locators.productBackBtn).click();
      await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
    await expect(this.page.locator(locators.cartBtn)).toHaveText("");
    console.log(`Removed ${removedCount} products successfully.`);
  }

  async goBackToProductPage() {
    const cartItemsLocator = this.page.locator(locators.cartItems);
    const count = await cartItemsLocator.count();
    const cartItemNames: string[] = [];

    for (let i = 0; i < count; i++) {
      const name = await cartItemsLocator.nth(i).innerText();
      cartItemNames.push(name.trim());
    }
    console.log("Items currently in cart:", cartItemNames);

    await this.page
      .getByRole("link", { name: locators.continueShopping })
      .click();
    await expect(this.page.locator(locators.inventoryList)).toBeVisible();
    await this.page.locator(locators.cartBtn).click();

    const newCartItemsLocator = this.page.locator(locators.cartItems);
    const newCount = await newCartItemsLocator.count();
    const newCartItemsNames: string[] = [];

    for (let i = 0; i < newCount; i++) {
      const name = await newCartItemsLocator.nth(i).innerText();
      newCartItemsNames.push(name.trim());
    }
    expect(newCartItemsNames).toEqual(cartItemNames);
  }

  async goToCheckout() {
    await this.page.getByRole("link", { name: locators.checkoutBtn }).click();
  }
}
