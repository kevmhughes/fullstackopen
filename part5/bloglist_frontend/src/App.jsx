import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  console.log("username", username);
  console.log("password", password);
  console.log("user", user);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
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

  return (
    <div className="container">
      <h1>Blogs</h1>

      {/* <Notification message={errorMessage} /> */}

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
            addBlog={"addBlog"}
            newBlog={newBlog}
            handleBlogChange={"handleBlogChange"}
          />
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
