import React, { useState } from "react";
import Togglable from "./Togglable";
import "../assets/styles/main.css";

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false);

  const handleAddLike = async (event) => {
    event.preventDefault();
    const updatedBlog = { ...blog, likes: blog.likes + 1 }; // Increment likes by 1
    addLike(blog.id, updatedBlog); // Call addLike with updated data
  };

  const handleDeleteBlog = async () => {
    deleteBlog(blog.id);
  };

  return (
    <>
      <div className="basic-blog-info">
        <h3 className="blog-title-and-author">
          {blog.title} by {blog.author}
        </h3>
        <Togglable
          buttonLabel={blogVisible ? "Hide Details" : "Show Details"}
          blogFormVisible={blogVisible}
          setBlogFormVisible={setBlogVisible}
        >
          <div className="blog-details">
            {blog.url && (
              <>
                <p className="blog-url">
                  <a
                    className="blog-url-link"
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View blog
                  </a>
                </p>
              </>
            )}
            <div className="likes-container">
              <div>{blog.likes}</div>
              <div onClick={handleAddLike} data-testid="likes-button">
                <i className="fas fa-thumbs-up"></i>
              </div>
            </div>
          </div>
          {/* Delete button should always be visible, depending on user */}
          {user && blog.user[0].username === user.username && (
            <button style={{ float: "inline-end" }} onClick={handleDeleteBlog}>
              Delete
            </button>
          )}
        </Togglable>
      </div>
    </>
  );
};

export default Blog;
