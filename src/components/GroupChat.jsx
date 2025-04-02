import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:5000");

function GroupChat() {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // Fetch joined groups
  useEffect(() => {
    const fetchJoinedGroups = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get("http://localhost:5000/api/users/joined-groups", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJoinedGroups(response.data);
      } catch (err) {
        console.error("Error fetching joined groups:", err);
        setError("Failed to load joined groups");
      }
    };
    fetchJoinedGroups();
  }, []);

  // Handle group selection and messages
  useEffect(() => {
    if (!selectedGroup) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/${selectedGroup._id}`);
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages");
      }
    };

    socket.emit("joinGroup", selectedGroup._id);
    fetchMessages();

    socket.on("receiveMessage", (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket.emit("leaveGroup", selectedGroup._id);
      socket.off("receiveMessage");
    };
  }, [selectedGroup]);

  const sendMessage = async () => {
    if (!message.trim() || !selectedGroup) return;

    try {
      const token = localStorage.getItem("userToken");
      const msgData = {
        groupId: selectedGroup._id,
        content: message
      };

      await axios.post(`http://localhost:5000/api/messages/${selectedGroup._id}`, msgData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      socket.emit("sendMessage", msgData);
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    }
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "20px", height: "80vh" }}>
        {/* Groups sidebar */}
        <div style={{ 
          width: "250px", 
          background: "rgba(255,255,255,0.05)",
          borderRadius: "10px",
          padding: "15px"
        }}>
          <h3 style={{ marginBottom: "15px" }}>Your Groups</h3>
          {joinedGroups.length === 0 ? (
            <p>No groups joined yet</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {joinedGroups.map(group => (
                <div
                  key={group._id}
                  onClick={() => setSelectedGroup(group)}
                  style={{
                    padding: "10px",
                    background: selectedGroup?._id === group._id ? 
                      "rgba(67, 97, 238, 0.3)" : 
                      "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  {group.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {selectedGroup ? (
            <>
              <div style={{ marginBottom: "20px" }}>
                <h2>{selectedGroup.name}</h2>
              </div>

              <div style={{ 
                flex: 1, 
                overflowY: "auto",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px"
              }}>
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "10px",
                      borderRadius: "8px",
                      marginBottom: "10px"
                    }}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message"
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.1)",
                    color: "white"
                  }}
                />
                <button 
                  onClick={sendMessage}
                  style={{
                    padding: "10px 20px",
                    background: "#4361ee",
                    border: "none",
                    borderRadius: "5px",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              height: "100%",
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.6)"
            }}>
              Select a group to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupChat;