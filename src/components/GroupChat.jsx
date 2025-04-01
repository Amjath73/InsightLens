import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:5000");

function GroupChat({ groupId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`/api/messages/${groupId}`).then((res) => setMessages(res.data));
    socket.emit("joinGroup", groupId);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });
  }, [groupId]);

  const sendMessage = () => {
    if (!message) return;
    const msgData = { groupId, content: message };
    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  return (
    <div>
      <h2>Group Chat</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
      </ul>
      <input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Type a message" 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default GroupChat;