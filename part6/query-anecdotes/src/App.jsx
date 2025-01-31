import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, createAnecdote, voteAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const increaseVotes = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdoteMutation.mutate(updatedAnecdote);
  };

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const addAnecdote = async (content) => {
    newNoteMutation.mutate({ content, votes: 0 });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <div>Anecdote service not available due to problems with the server.</div>
    );
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    console.log("anecdote", anecdote);
    increaseVotes(anecdote);
  };

  return (
    <div className="container">
      <h3 style={{ marginTop: "1rem" }}>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onSubmit={addAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} style={{ marginBottom: "1rem" }}>
          <div>{anecdote.content}</div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginTop: "0.5rem",
            }}
          >
            <button onClick={() => handleVote(anecdote)}>vote</button>
            <div>
              {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
