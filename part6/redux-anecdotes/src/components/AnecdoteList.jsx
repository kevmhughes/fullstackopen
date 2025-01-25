import { useDispatch, useSelector } from "react-redux";
import { voteAnecdoteAsync } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { clearNotification } from "../reducers/notificationReducer";
import { useRef } from "react";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  // Use useRef to persist the timeoutId across renders
  const timeoutIdRef = useRef(null);

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return anecdotes; // default case: return all anecdotes
  });

  const vote = (id, content) => {
    dispatch(voteAnecdoteAsync(id));
    showNotificationForVote(content);
  };

  const showNotificationForVote = (content) => {
    // Clear the previous timeout if it exists
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Show new notification
    dispatch(setNotification(`You have voted for "${content}".`));

    // Set a new timeout to clear the notification after 5 seconds
    timeoutIdRef.current = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} style={{ marginBottom: "2rem" }}>
          <q style={{ fontSize: "1.5rem" }}>{anecdote.content}</q>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}
            <button
              onClick={() => vote(anecdote.id, anecdote.content)}
              style={{ width: "fit-content" }}
            >
              Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
