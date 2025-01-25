import { useEffect } from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
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
