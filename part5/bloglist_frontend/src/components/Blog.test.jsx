import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("shows blog URL and likes when the 'Show Details' button is clicked", () => {
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

  // Query for the blog title and author using the role and text content
  const titleAndAuthor = screen.getByRole("heading", {
    level: 3,
    name: /Dave's Fourth Blog by David James/i,
  });

  // Find the first "Show Details" button inside the blog container (before details are revealed)
  const blogContainer = within(titleAndAuthor.closest(".basic-blog-info"));

  // Use getByRole to target the first "Show Details" button
  const firstButton = blogContainer.getByRole("button", {
    name: /show details/i,
  });

  // Simulate a click on the "Show Details" button
  fireEvent.click(firstButton);

  // After clicking, the URL and likes should be visible
  const visibleUrlElement = screen.getByText("View blog");
  expect(visibleUrlElement).toBeInTheDocument();

  const visibleLikesElement = screen.getByText(/0/); // Adjust the query to match the likes text
  expect(visibleLikesElement).toBeInTheDocument();
});

test("when the like button is clicked twice, the event handler is called twice", async () => {
  const blog = {
    title: "Dave's Fourth Blog",
    author: "David James",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes",
    likes: 0,
    user: [{ username: "passworddave" }],
    id: "6763078af8dabca70b458b32",
  };

  // Create a mock function to track calls
  const mockHandler = vi.fn();

  // Render the Blog component with the mock function passed as addLike
  render(
    <Blog blog={blog} user={null} addLike={mockHandler} deleteBlog={() => {}} />
  );

  const user = userEvent.setup();
  const button = screen.getByTestId("likes-button");

  // Simulate two clicks on the like button
  await user.click(button);
  await user.click(button);

  // Assert that the handler was called twice
  expect(mockHandler).toHaveBeenCalledTimes(2);
});
