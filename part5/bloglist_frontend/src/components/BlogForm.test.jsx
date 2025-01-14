import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("calls addBlog with correct details when a new blog is submitted", async () => {
  const newBlog = {
    title: "Dave's Fourth Blog",
    author: "David James",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes",
  };

  const addBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm addBlog={addBlog} />);

  const inputs = screen.getAllByRole("textbox");
  const submitButton = screen.getByText("Add Blog");

  await user.type(inputs[0], newBlog.title);
  await user.type(inputs[1], newBlog.author);
  await user.type(inputs[2], newBlog.url);
  await user.click(submitButton);

  // Check that addBlog is called with the correct values
  expect(addBlog.mock.calls).toHaveLength(1); // Expect one call to addBlog
  console.log("mock calls", addBlog.mock.calls[0][0]);
  expect(addBlog.mock.calls[0][0].title).toBe("Dave's Fourth Blog");
  expect(addBlog.mock.calls[0][0].author).toBe("David James");
  expect(addBlog.mock.calls[0][0].url).toBe(newBlog.url);
});
