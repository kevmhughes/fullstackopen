import React, { useState } from "react";
import Togglable from "./Togglable";
import "../assets/styles/main.css";

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false);

  return (
    <>
      <div className="basic-blog-info">
        <h3>{blog.title}</h3>
        <Togglable
          buttonLabel={blogVisible ? "Hide Details" : "Show Details"}
          blogFormVisible={blogVisible}
          setBlogFormVisible={setBlogVisible}
        >
          <div className="blog-details">
            {blog.url && (
              <>
                <div className="author">Author: {blog.author}</div>
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
            <p>Likes: {blog.likes}</p>
          </div>
        </Togglable>
      </div>
    </>
  );
};

export default Blog;
