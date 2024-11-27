const Notification = ({ message, messageCSS }) => {
    console.log("message CSS:", messageCSS)
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