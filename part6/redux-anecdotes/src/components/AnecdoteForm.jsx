import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { clearNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    // Check if the content is at least 5 characters long
    if (content.length < 5) {
      dispatch(setNotification("Anecdote must be at least 5 characters long.", "error"));

      // Clear the notification after a timeout
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } else {
     /*  dispatch(createAnecdote(content)); */
      const newAnecdote = await anecdoteService.createAnecdote(content)
      dispatch(createAnecdote(newAnecdote))
      showNotificationForNewAnecdote(content);
    }
  };

  const showNotificationForNewAnecdote = (content) => {
    dispatch(setNotification(`"${content}" has been added.`));

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
