const Notification = ({ message, messageCSS }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={messageCSS}>
        {message}
      </div>
    )
  }

  export default Notification