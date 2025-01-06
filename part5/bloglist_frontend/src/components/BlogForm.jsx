import React from "react";
import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleInputChange = (field) => (event) => {
    setNewBlog({
      ...newBlog,
      [field]: event.target.value,
    });
  };

  const handleAddBlog = (event) => {
    event.preventDefault();
    addBlog(newBlog); // Call the addBlog function passed from App.jsx
    setNewBlog({ title: "", author: "", url: "" }); // Clear the form
  };

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={handleAddBlog}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newBlog.title}
          onChange={handleInputChange("title")}
          placeholder="title"
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={newBlog.author}
          onChange={handleInputChange("author")}
          placeholder="author"
        />
        <label htmlFor="url">URL:</label>
        <input
          type="url"
          id="url"
          name="url"
          value={newBlog.url}
          onChange={handleInputChange("url")}
          placeholder="url"
        />
        <button type="submit">Add Blog</button>
      </form>
    </>
  );
};

export default BlogForm;
