import { useEffect } from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";
import { useDispatch } from "react-redux";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>ANECDOTES</h1>
      <AnecdoteFilter />
      <AnecdoteForm />
      <Notification />
      <AnecdoteList />
    </div>
  );
};

export default App;
