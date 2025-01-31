import { useReducer } from "react";
import NotificationContext from "./components/NotificationContext";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, createAnecdote, voteAnecdote } from "./requests";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const App = () => {
  const queryClient = useQueryClient();

  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    null
  );

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

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const addAnecdote = async (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return (
      <div className="container" style={{ marginTop: "1rem" }}>
        loading data...
      </div>
    );
  }

  if (result.isError) {
    return (
      <div className="container" style={{ marginTop: "1rem" }}>
        Anecdote service not available due to problems with the server.
      </div>
    );
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    console.log("anecdote", anecdote);
    increaseVotes(anecdote);
    dispatchNotification({
      type: "SET_NOTIFICATION",
      payload: `You voted for '${anecdote.content}'`,
    });
    setTimeout(() => {
      dispatchNotification({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, dispatchNotification }}
    >
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
    </NotificationContext.Provider>
  );
};

export default App;
