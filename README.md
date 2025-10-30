# Lab08 Assignment - Swag Labs

## Technical Stack

- Playwright
- TypeScript
- Node.js 22.16.0
- GitHub Actions
- Playwright HTML Reporter

### Framework Architecture & Approach

- The framework follows the Page Object Model pattern.

1. Page Object Model (POM)

Each major page or component of the application (Login, Products, Cart, Checkout) has its own corresponding class under the `/pages` directory. This ensures:

- Maintainability: UI changes only require updating the corresponding Page Object class, not the test files.
- Reusability: Page methods can be called across multiple tests

Page Classes Include:

- LoginPage.ts
- ProductPage.ts
- CartPage.ts
- CheckoutPage.ts

2. Custom Playwright Fixtures

The framework uses custom Playwright fixtures defined in `/fixtures/baseFixtures.ts` to manage and inject Page Object instances directly into tests. This provides a clean, dependency-injection approach to the tests.

- `test.extend<MyFixture>` automatically provides instances of `loingPage`, `productPage`, `cartPage`, and `checkoutPage` to any test that needs them.

3. Data and Locators Management

The framework centralizes all non-test logic elements for easier management:

- `/locators`: Ui selectors and common error messages are stored in separate JSON files (`locators.json`, `errorMessages.json`). Locators use Playwright's recommend `data-test` attributes where possible.
- `/testData`: User credentials and information is sotres in `testData.json`.

4. Test Organization

Tests are organized into separate files under the `/tests` directory baed on the functional area they cover:

- `1.login.spec.ts`
- `2.products.spec.ts`
- `3.cart.spec.ts`
- `4.checkout.spec.ts`
- `e2e.spec.ts`

The `2.products.spec.ts`, `cart.spec.ts`, `checkout.spec.ts` and `e2e.spec.ts` files utilize a data-driven loop to run the same set of tests against multiple user accounts (`standar_user`, `problem_user`, `performeance_glitch_user`), ensuring comprehensive coverage for different user scenarious.

### Test Flow Overview

1. Login Flow

- Navigate to the login page.
- Enter valid crendtials.
- Test invalid crendetials.
- Assert successful redirection to the inventory page.

2. Product Page

- Dynamically iterate through products.
- Add visible products to the cart.
- Verify cart counter updates.

3. Cart Page

- Open the cart and verify the list of added products.
- Remove selected items and assert the counter decrements.
- Verify persistence when navigating back via Continue Shopping.

4. Checkout Page

- Validate total and final price accuracy.
- Include negative test cases such as attempting checkout with an empty cart.
