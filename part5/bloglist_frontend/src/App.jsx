import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import "./assets/styles/main.css";

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
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs); // Update the state with the fetched blogs
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs(); // Call the async function
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
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.error
          : "An error occurred while logging in. Please try again later.";
      setErrorMessage(errorMessage);
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
      setBlogs((prevBlogs) => [...prevBlogs, blog]); // Add the new blog to the current list of blogs
      setBlogFormVisible(false);
      setNewBlog({ title: "", author: "", url: "" });
      setMessage(`${newBlog.title} by ${newBlog.author} has been added.`);
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

  const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
  const showWhenVisible = { display: blogFormVisible ? "" : "none" };

  return (
    <div className="container">
      <h1 style={{ marginTop: "1rem" }}>Blogs</h1>

      <Notification errorMessage={errorMessage} message={message} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          password={password}
          username={username}
          setPassword={({ target }) => setPassword(target.value)}
          setUsername={({ target }) => setUsername(target.value)}
        />
      ) : (
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>{user.name} logged-in</div>
          <Togglable
            buttonLabel="Create Blog"
            blogFormVisible={blogFormVisible}
            setBlogFormVisible={setBlogFormVisible}
            hideWhenVisible={hideWhenVisible}
            showWhenVisible={showWhenVisible}
          >
            <BlogForm
              addBlog={handleAddBlog}
              newBlog={newBlog}
              setNewBlog={setNewBlog}
            />
          </Togglable>
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
