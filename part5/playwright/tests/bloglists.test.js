const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const form = page.locator("#login-form");
    await expect(form).toBeVisible();
  });

  test("succeeds with correct credentials", async ({ page }) => {
    await page.getByTestId("username").fill("mluukkai");
    await page.getByTestId("password").fill("salainen");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("Matti Luukkainen is logged-in")).toBeVisible();
  });

  test("fails with wrong credentials", async ({ page }) => {
    await page.getByTestId("username").fill("John");
    await page.getByTestId("password").fill("qwerty123!");
    await page.getByRole("button", { name: "login" }).click();
    const errorDiv = page.locator(".error");
    await expect(errorDiv).toContainText("Invalid username or password.");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
  });
});
