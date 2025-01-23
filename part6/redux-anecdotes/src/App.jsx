import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";

const App = () => {
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
