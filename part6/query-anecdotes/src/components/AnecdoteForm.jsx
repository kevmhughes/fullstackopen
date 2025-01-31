import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = ({ onSubmit }) => {
  const dispatchNotification = useNotificationDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    if (content.length < 5) {
      dispatchNotification({
        type: "SET_NOTIFICATION",
        payload: "Anecdote must be at least 5 characters long.",
      });
      setTimeout(() => {
        dispatchNotification({
          type: "CLEAR_NOTIFICATION",
        });
      }, 5000);
      return;
    }
    onSubmit(content);
    dispatchNotification({
      type: "SET_NOTIFICATION",
      payload: `You voted for '${content}'`,
    });
    setTimeout(() => {
      dispatchNotification({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
