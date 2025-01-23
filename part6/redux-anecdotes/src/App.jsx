import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteFilter from "./components/AnecdoteFilter";

const App = () => {
  return (
    <div className="container">
      <h1 style={{textAlign: "center", marginTop: "1rem"}}>ANECDOTES</h1>
      <AnecdoteFilter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
