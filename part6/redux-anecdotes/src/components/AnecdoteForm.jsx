import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    // Check if the content is at least 5 characters long
    if (content.length < 5) {
      // Use the new setNotificationWithTimeout with a duration of 5 seconds for error message
      dispatch(
        setNotificationWithTimeout(
          "Anecdote must be at least 5 characters long.",
          5
        )
      );
    } else {
      dispatch(createAnecdote(content));
      // Use setNotificationWithTimeout to show a success message
      dispatch(setNotificationWithTimeout(`"${content}" has been added.`, 5));
    }
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
