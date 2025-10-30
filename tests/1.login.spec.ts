import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { testData } from "../utils/dataLoader";

test("Login with standard user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(testData.standardUser, testData.validPassword);
});

test("Wrong Creds", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.wrongCredentialsLogin(
    testData.standardUser,
    testData.wrongPassword
  );
  await loginPage.goto();
  await loginPage.wrongCredentialsLogin(
    testData.incorrectUser,
    testData.validPassword
  );
});

test("Locked Out User", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.lockedOutUserLogin(
    testData.lockedUser,
    testData.validPassword
  );
});

test("Performance user Login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(testData.performanceUser, testData.validPassword);
});

test("Problem user Login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(testData.problemUser, testData.validPassword);
});
