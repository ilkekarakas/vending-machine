import React from "react";
import "../App.css";

function Message({ message }) {
  return (
    <div className="message-box">
      <p className="message">{message}</p>
    </div>
  );
} 

export default Message;
