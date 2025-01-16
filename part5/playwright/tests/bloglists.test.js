const { loginWith, createBlog } = require("./helper");

const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const form = page.locator("#login-form");
    await expect(form).toBeVisible();
  });

  test("succeeds with correct credentials", async ({ page }) => {
    await loginWith(page, "mluukkai", "salainen");
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

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a new blog can be created", async ({ page }) => {
      // Create a new blog
      await createBlog(page, "Matti Luukkainen");

      // Wait for the blog creation API response
      const [response] = await Promise.all([
        page.waitForResponse(
          (response) =>
            response.url().includes("/api/blogs") && response.status() === 200
        ),
        page.getByRole("button", { name: "Add Blog" }).click(),
      ]);

      // Ensure the blog creation was successful (API status check)
      expect(response.status()).toBe(200);

      // Check for success confirmation message
      await expect(
        page.getByText("My Blog by Matti Luukkainen has been added")
      ).toBeVisible();

      // Verify that the new blog appears with the correct title in the blog list
      const blogHeader = await page.locator("h3").textContent();
      expect(blogHeader).toContain("My Blog by Matti Luukkainen");
    });

    test("a new blog can be liked", async ({ page }) => {
      // Create a new blog
      await createBlog(page, "Matti Luukkainen");
      // Find Show Details button and click
      await page.getByRole("button", { name: "Show Details" }).click();
      // Check that there are 0 default likes
      await expect(page.getByText("0")).toBeVisible();
      // Click like
      await page.locator('[data-testid="likes-button"]').click();
      // Check that likes have incremented by 1
      await expect(page.getByText("1")).toBeVisible();
    });
  });
});
