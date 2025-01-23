import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { clearNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    showNotificationForNewAnecdote();
  };

  const showNotificationForNewAnecdote = () => {
    dispatch(setNotification("A new anecdote has been added."));

    // Clear the notification after a timeout
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div
      style={{
        marginBottom: "1rem",
      }}
    >
      <h2>Create Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
