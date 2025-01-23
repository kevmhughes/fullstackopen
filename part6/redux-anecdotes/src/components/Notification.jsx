import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.message);

  const style = {
    border: "solid 1px red",
    borderRadius: "5px",
    padding: "12px",
    borderWidth: 1,
    color: "red",
    fontSize: "1rem",
  };

  return <div>{notification && <p style={style}>{notification}</p>}</div>;
};

export default Notification;
