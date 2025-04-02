import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ['websocket']
});

function GroupChat({ groupId }) {
  const navigate = useNavigate(); // Add this
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [groupName, setGroupName] = useState(""); // Add state for group name

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUserId(decoded.userId);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (!groupId) return;

    const token = localStorage.getItem("userToken");
    if (!token) return;

    // Fetch group details and messages
    const initializeChat = async () => {
      try {
        // Fetch group details
        const groupResponse = await axios.get(
          `http://localhost:5000/api/groups/${groupId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGroupName(groupResponse.data.name);

        // Fetch messages
        const messagesResponse = await axios.get(
          `http://localhost:5000/api/messages/group/${groupId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(messagesResponse.data);
        
        socket.emit("joinGroup", groupId);
      } catch (err) {
        console.error("Error initializing chat:", err);
        setError("Failed to load chat");
      }
    };

    initializeChat();

    // Set up socket listener for new messages
    const handleNewMessage = (newMessage) => {
      console.log('Received new message:', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.emit("leaveGroup", groupId);
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [groupId]);

  const sendMessage = async () => {
    if (!message.trim() || !groupId || !userId) return;

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Please sign in to send messages");
        return;
      }

      // Send message through socket
      socket.emit('sendMessage', {
        groupId,
        content: message,
        token
      });

      // Clear input immediately for better UX
      setMessage("");

      // Post to API for persistence
      await axios.post(
        'http://localhost:5000/api/messages',
        {
          content: message,
          group: groupId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "80vh" }}>
        {groupId ? (
          <>
            <div style={{ 
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start"
            }}>
              {/* Group title and subtitle */}
              <div>
                <h2 style={{ 
                  color: "#fff",
                  fontSize: "1.8rem",
                  fontWeight: "600",
                  marginBottom: "4px"
                }}>
                  {groupName || "Loading..."}
                </h2>
                <p style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.9rem",
                  margin: "0",
                  fontWeight: "500"
                }}>
                  Research-based Discussion Forum
                </p>
              </div>

              {/* Back button aligned to right */}
              <button
                onClick={() => navigate("/community")}
                style={{
                  background: "rgba(233, 69, 96, 0.15)",
                      border: "1px solid rgba(233, 69, 96, 0.3)",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      color: "#e94560",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                  marginLeft: "auto"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Community
              </button>
            </div>

            {/* Messages section */}
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
                  key={msg._id || index}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "10px"
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px"
                  }}>
                    <span style={{
                      fontWeight: "600",
                      color: "#f96798", // Changed to a bright cyan color
                      fontSize: "0.95rem"
                    }}>
                      {msg.sender?.name || "Anonymous"}
                    </span>
                    <span style={{
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.6)"
                    }}>
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ 
                    wordBreak: "break-word",
                    color: "#ffffff"
                  }}>
                    {msg.content}
                  </div>
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
  );
}

export default GroupChat;