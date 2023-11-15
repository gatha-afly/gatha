import { useState } from "react";

const Message = () => {
  const [messageText, setMessageText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: "<author_id>",
          text: messageText,
          group: "<group_id>",
        }),
      });

      if (response.status === 201) {
        setMessageText(""); // Clear the message input
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to send the message");
    }
  };

  return (
    <div className='message-container'>
      <form className='message-form' onSubmit={handleSubmit}>
        <input
          className='input-message'
          type='text'
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default Message;
