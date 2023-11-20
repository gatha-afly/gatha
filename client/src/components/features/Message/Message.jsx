import "./message.css";
const Message = () => {
  return (
    <div className="message-container">
      <div className="message-header">
        <h1 className="chat-heading">Chat App</h1>
      </div>
      <div className="message-form-container">
        <div className="message-input-container">
          <input type="text" className="message-input" />
          <button className="message-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
