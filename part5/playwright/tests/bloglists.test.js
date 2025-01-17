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

    test("a blog can be liked", async ({ page }) => {
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

    test("blogs are ordered in descending order based on number of likes", async ({
      page,
    }) => {
      // Create the first new blog
      await createBlog(page, "Matti Luukkainen");
      // Find Show Details button and click
      await page.getByRole("button", { name: "Show Details" }).click();
      // Check that there are 0 default likes
      await expect(page.getByText("0")).toBeVisible();
      // Click like
      await page.locator('[data-testid="likes-button"]').click();
      // Check that likes have incremented by 1
      await expect(page.getByText("1")).toBeVisible();
      // Click like again
      await page.locator('[data-testid="likes-button"]').click();
      // Check that likes have incremented by 1 to a total of 2
      await expect(page.getByText("2")).toBeVisible();
      // Create the second new blog - Second Blogger
      await createBlog(page, "Second Blogger");
      // locate the second blog
      const blog2 = page
        .locator(".basic-blog-info")
        .filter({ hasText: "My Blog by Second Blogger" });
      // Find Show Details button and click
      await blog2.getByRole("button", { name: "Show Details" }).click();
      // Click like 3 times and check that the likes have incremented by each time to a total of 3
      const likeButton2 = blog2.locator('[data-testid="likes-button"]');
      await likeButton2.click();
      await expect(page.getByText("1")).toBeVisible();
      await likeButton2.click();
      await expect(page.getByText("2")).toBeVisible();
      await likeButton2.click();
      /* await expect(page.getByText("3")).toBeVisible({ timeout: 30000 }); */

      // Trigger sort on next render by creating a third new blog
      await createBlog(page, "Third Blogger");
      const blog3 = page
        .locator(".basic-blog-info")
        .filter({ hasText: "My Blog by Third Blogger" });
      // Find Show Details button and click
      await blog3
        .getByRole("button", { name: "Show Details" })
        .waitFor({ state: "visible", timeout: 30000 });

      await page.waitForTimeout(20000);

      // Check that the first blog after the rendering the sort is the one with the most likes (Second Blogger)
      expect(page.locator(".basic-blog-info").first()).toContainText(
        "My Blog by Second Blogger"
      );
    });

    test("a blog can be deleted", async ({ page }) => {
      // Create a new blog
      await createBlog(page, "Matti Luukkainen");
      // Find Show Details button and click
      await page.getByRole("button", { name: "Show Details" }).click();

      // Listen for the confirmation dialog and click "OK" to confirm the deletion
      page.on("dialog", async (dialog) => {
        expect(dialog.message()).toContain(
          "Do you really want to delete that blog?"
        );
        await dialog.accept(); // Accept the dialog (click "OK")
      });

      // Click the "Delete" button to trigger the dialog
      await page.getByRole("button", { name: "Delete" }).click();

      // Ensure that the blog is no longer visible on the page
      await expect(
        page.locator('h3:has-text("My Blog by Matti Luukkainen")')
      ).not.toBeVisible();
    });

    describe("when logged in as another user", () => {
      beforeEach(async ({ page, request }) => {
        // Create the second user (John Smith)
        await request.post("/api/users", {
          data: {
            name: "John Smith",
            username: "john",
            password: "smith",
          },
        });
      });

      test("a blog can only be deleted by its creator", async ({ page }) => {
        // Create a new blog as "Matti Luukkainen"
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

        // Log out the current user (Matti Luukkainen)
        await page.getByRole("button", { name: "Log Out" }).click();

        // Log in as John Smith
        await loginWith(page, "john", "smith");

        // Verify John Smith is logged-in
        await expect(page.getByText("John Smith is logged-in")).toBeVisible();

        // Find Show Details button and click
        await page.getByRole("button", { name: "Show Details" }).click();

        // Verify that the "Delete" button is not visible (the user cannot delete another user's blog)
        await expect(
          page.locator('button:has-text("Delete")')
        ).not.toBeVisible();
      });
    });
  });
});
