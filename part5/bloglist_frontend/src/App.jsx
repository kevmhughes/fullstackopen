import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  /*   console.log("username", username);
  console.log("password", password);
  console.log("user", user);
  console.log("title", newBlog.title);
  console.log("author", newBlog.author);
  console.log("url", newBlog.url);
  console.log("errorMessage", errorMessage) */
  console.log("message", message);
  console.log("newBlog", newBlog);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create(newBlog);
      blogService.setToken(user.token);
      setNewBlog(blog);
      setNewBlog({ title: "", author: "", url: "" });
      setMessage(
        `A new blog ${newBlog.title} by ${newBlog.author} has been added.`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.error
          : "An error occurred while adding the blog. Please try again later.";
      setErrorMessage(errorMessage);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: "1rem" }}>Blogs</h1>

      <Notification errorMessage={errorMessage} message={message} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          password={password}
          username={username}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <BlogForm
            addBlog={handleAddBlog}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
          />
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      {user !== null && (
        <button style={{ marginTop: "1rem" }} onClick={handleLogOut}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default App;
