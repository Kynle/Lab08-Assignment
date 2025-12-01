import { test } from "../fixtures/baseFixture";
import { testData } from "../utils/dataLoader";

test("Login with standard user", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(testData.standardUser, testData.validPassword);
});

test("Wrong Creds", async ({ loginPage }) => {
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

test("Locked Out User", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.lockedOutUserLogin(
    testData.lockedUser,
    testData.validPassword
  );
});

test("Performance user Login", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(testData.performanceUser, testData.validPassword);
});

test("Problem user Login", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(testData.problemUser, testData.validPassword);
});
