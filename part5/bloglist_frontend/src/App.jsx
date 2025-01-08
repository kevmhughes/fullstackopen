import { useState, useEffect, useRef } from "react";
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
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll();
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs); // Update the state with the fetched blogs
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
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

  const blogFormRef = useRef();

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

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      blogService.setToken(user.token);
      setBlogs((prevBlogs) => [...prevBlogs, blog]);
      fetchBlogs();
      setMessage(`${newBlog.title} by ${newBlog.author} has been added.`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.error
          : "An error occurred while adding the blog.";
      setErrorMessage(errorMessage);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addLike = async (id, updatedBlog) => {
    try {
      // Update the blog with new like count
      const blog = await blogService.update(id, updatedBlog);

      // Update state immutably with the updated blog
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b.id === blog.id ? { ...b, likes: blog.likes } : b
        )
      );
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.error
          : "An error occurred while updating the blog.";
      setErrorMessage(errorMessage);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    // Retrieve the logged-in user's token from local storage
    const storedUser = localStorage.getItem("loggedBlogappUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user ? user.token : null;

    if (!token) {
      setErrorMessage("You must be logged in to delete a blog.");
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    // Confirm if the user really wants to delete the blog
    const isConfirmed = window.confirm(
      "Do you really want to delete that blog?"
    );

    if (isConfirmed) {
      try {
        const blogToDelete = await blogService.getById(id);
        if (!blogToDelete) {
          setErrorMessage("Blog not found.");
          setTimeout(() => setErrorMessage(null), 5000);
          return;
        }

        // Make the request with the correct headers
        await blogService.deleteBlog(id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));

        setMessage(`${blogToDelete.title} has been deleted successfully.`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (error) {
        setErrorMessage("An error occurred while deleting the blog.");
        setTimeout(() => setErrorMessage(null), 5000);
        console.error("Error deleting blog:", error);
      }
    } else {
      // Handle cancelation if the user clicks "Cancel"
      console.log("Blog deletion canceled.");
    }
  };

  return (
    <div className="container">
      {user !== null && (
        <header>
          <div className="user-logged-in">{user.name} is logged-in</div>
          <button
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </header>
      )}
      <h1 style={{ marginTop: "1rem", textAlign: "center" }}>Blogs</h1>

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
          <Togglable
            buttonLabel={!blogFormVisible ? "Create Blog" : "Cancel"}
            blogFormVisible={blogFormVisible}
            setBlogFormVisible={setBlogFormVisible}
            ref={blogFormRef}
          >
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <div className="blogs-container">
        <h2>Most Liked Blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            addLike={addLike}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
