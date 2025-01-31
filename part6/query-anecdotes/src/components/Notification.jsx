import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  console.log("notification", notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: "red",
    borderRadius: 5,
  };

  if (notification === null) {
    return null;
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
