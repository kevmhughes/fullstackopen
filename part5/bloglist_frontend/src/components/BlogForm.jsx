import React from "react";

const BlogForm = ({ addBlog, newBlog, setNewBlog }) => {
  const handleInputChange = (field) => (event) => {
    setNewBlog({
      ...newBlog,
      [field]: event.target.value,
    });
  };

  return (
    <>
      <h1>Create New Blog</h1>
      <form onSubmit={addBlog}>
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
          nae="url"
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
