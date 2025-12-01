import { Page, expect } from "@playwright/test";
import { locators } from "../utils/dataLoader";

export default class ProductsPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async enterCart() {
    await this.page.locator(locators.cartBtn).getByRole("link").click();
  }

  async productValues() {
    const productCard1 = this.page.locator(locators.inventoryItem);
    const countProducts = await productCard1.count();
    let total = 0;
    for (let i = 0; i < countProducts; i++) {
      const card = productCard1.nth(i);

      const priceText2 = await card
        .locator(locators.inventoryPrice)
        .textContent();
      const productValue = parseFloat(priceText2!.replace("$", "").trim());
      console.log(`The price for ${productCard1}: ${productValue}`);
      total += productValue;
    }
    console.log(`the total is ${total}`);
    return total;
  }

  async addAllItems() {
    const productCards = this.page.locator(locators.inventoryItem);
    const count = await productCards.count();
    let clickedCount = 0;
    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const addButton = card.getByRole("button", { name: locators.addItem });

      if (await addButton.isVisible()) {
        await addButton.click();
        clickedCount++;
      }
      await expect(
        card.getByRole("button", { name: locators.removeItem })
      ).toBeVisible();
    }
    await expect(this.page.locator(locators.cartBtn)).toHaveText(
      `${clickedCount}`
    );
  }

  async removeAllItems() {
    const productCards = this.page.locator(locators.inventoryItem);
    const count = await productCards.count();

    for (let i = 0; i < count; i++) {
      const card = productCards.nth(i);
      const removeButtons = card.getByRole("button", {
        name: locators.removeItem,
      });
      if (await removeButtons.isVisible()) {
        await removeButtons.click();
      }
      await expect(
        card.getByRole("button", { name: locators.addItem })
      ).toBeVisible();
    }
  }

  async inspectAndAddProducts() {
    const productCard = this.page.locator(locators.inventoryItem);
    const count = await productCard.count();
    let clickedCount = 0;

    for (let i = 0; i < count; i++) {
      const addItemBtn = this.page.getByRole("button", {
        name: locators.addItem,
      });
      const card = this.page.locator(locators.inventoryItem).nth(i);
      const productLink = card.locator(locators.productTitleLink);
      const productName = await productLink.innerText();
      console.log(`Opening and adding: ${productName}`);

      await productLink.click();
      if (await addItemBtn.isVisible()) {
        await addItemBtn.click();
        clickedCount++;
      }
      await expect(
        this.page.getByRole("button", { name: locators.removeItem })
      ).toBeVisible();
      await this.page
        .getByRole("button", { name: locators.productBackBtn })
        .click();
    }
    await expect(this.page.locator(locators.cartBtn)).toHaveText(
      `${clickedCount}`
    );
  }

  async filterByPriceLow() {
    await this.page.getByRole("combobox").selectOption(locators.filterLoHi);
    const prices = await this.page.$$eval(locators.inventoryPrice, (els) =>
      els.map((el) => +el.textContent!.replace("$", ""))
    );
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  }

  async filterByPriceHigh() {
    await this.page.getByRole("combobox").selectOption(locators.filterHiLo);
    const prices = await this.page.$$eval(locators.inventoryPrice, (els) =>
      els.map((el) => +el.textContent!.replace("$", ""))
    );
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  }

  async filterByNameA_Z() {
    await this.page.getByRole("combobox").selectOption(locators.filterAZ);
    const names = await this.page.$$eval(locators.inventoryName, (els) =>
      els.map((el) => el.textContent!.trim())
    );
    expect(names).toEqual([...names].sort());
  }

  async filterByNameZ_A() {
    await this.page.getByRole("combobox").selectOption(locators.filterZA);
    const names = await this.page.$$eval(locators.inventoryName, (els) =>
      els.map((el) => el.textContent!.trim())
    );
    expect(names).toEqual([...names]);
  }

  async calculateProductPrices() {
    const productCards = this.page.locator(locators.inventoryItem);
    const countProducts = await productCards.count();
    let total = 0;
    for (let i = 0; i < countProducts; i++) {
      const card = productCards.nth(i);
      const removeButton = card.getByRole("button", {
        name: locators.removeItem,
      });
      if (await removeButton.isVisible()) {
        const priceText = await card
          .locator(locators.inventoryPrice)
          .textContent();

        const priceValue = parseFloat(priceText!.replace("$", "").trim());
        total += priceValue;
      }
    }
    console.log(
      `The total of all products on the Products page is: $${total}.`
    );
    return total;
  }
}
