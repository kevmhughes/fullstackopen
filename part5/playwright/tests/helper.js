const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, content) => {
  await page.getByRole("button", { name: "Create Blog" }).click();
  await page.getByRole("textbox", { name: "Title" }).fill("My Blog");
  await page.getByRole("textbox", { name: "Author" }).fill(content);
  // Wait for the URL input to be visible before filling it
  const urlInput = page.locator('input[type="url"]');
  await urlInput.fill(
    "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes"
  );
  await page.getByRole("button", { name: "Add Blog" }).click();
};

export { loginWith, createBlog };
