/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";

import { useState } from "react";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/anecdotes">
        anecdotes
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is &quot;a story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const { reset: contentReset, ...contentProps } = content;
  const { reset: authorReset, ...authorProps } = author;
  const { reset: infoReset, ...infoProps } = info;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/anecdotes");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <div>
          <button style={{ marginRight: "1rem" }}>create</button>
          <button
            type="button"
            onClick={() => {
              contentReset();
              authorReset();
              infoReset();
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");
  console.log("notification", notification);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content} has been created!`);
    setTimeout(() => {
      setNotification("");
    }, "5000");
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const Anecdote = ({ anecdotes }) => {
    const match = useMatch("/anecdotes/:id");
    console.log("match", match.params.id);

    const anecdote = match
      ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
      : null;

    return (
      <div>
        <h2>{anecdote.content}</h2>
      </div>
    );
  };

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      {notification.length > 0 && (
        <div
          style={{
            border: "solid, 1px, red",
            padding: ".5rem",
            borderRadius: "5px",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          {notification}
        </div>
      )}
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
