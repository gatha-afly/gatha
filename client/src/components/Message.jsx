import "./message.css";

const Message = () => {
  return (
    <div className="message-container">
      <form className="message-form">
        <input className="input-message" type="text" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Message;
