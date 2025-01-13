import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog title and author, but not URL or likes by default", () => {
  const blog = {
    title: "Dave's Fourth Blog",
    author: "David James",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes",
    likes: 0,
    user: [{ username: "passworddave" }],
    id: "6763078af8dabca70b458b32",
  };

  render(
    <Blog blog={blog} user={null} addLike={() => {}} deleteBlog={() => {}} />
  );

  // Check if the title and author are rendered correctly
  const titleAndAuthor = screen.getByRole("heading", { level: 3 });
  expect(titleAndAuthor).toHaveTextContent("Dave's Fourth Blog by David James");

  // Initially, blog details should be hidden. We can check this by verifying the visibility of the details container (blogVisible = false).
  const blogDetailsDiv = screen.getByTestId("blog-details-when-shown");

  // Assert that blogVisible is false by default (URL and likes are hidden)
  expect(blogDetailsDiv).toHaveStyle("display: none");
});
