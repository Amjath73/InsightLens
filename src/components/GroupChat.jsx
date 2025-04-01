import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const GroupChat = () => {
  const { groupId } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messageEndRef = useRef(null);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroup(response.data);
      } catch (err) {
        console.error("Error fetching group details:", err);
        setError("Failed to load group information. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchGroupDetails();
      fetchMessages();
    }
  }, [groupId, token]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/groups/${groupId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.reverse());
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please try again.");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/groups/${groupId}/messages`,
        { content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages([...messages, response.data.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.response?.data?.message || "Failed to send message. Please try again.");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/groups/${groupId}/leave`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/community");
    } catch (err) {
      console.error("Error leaving group:", err);
      setError(err.response?.data?.message || "Failed to leave group. Please try again.");
    }
  };

  const handleCreateGroup = async (groupData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/groups",
        groupData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        console.log("Group created:", response.data);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      if (error.response?.status === 401) {
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const pollInterval = setInterval(() => {
      if (token) {
        fetchMessages();
      }
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [groupId, token]);

  if (loading) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.2)",
              borderTopColor: "#e94560",
              animation: "spin 1s linear infinite",
              marginBottom: "1rem",
            }}
          />
          <div style={{ fontSize: "1.2rem", fontWeight: "500" }}>Loading group chat...</div>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            background: "rgba(233, 69, 96, 0.15)",
            border: "1px solid rgba(233, 69, 96, 0.3)",
            borderRadius: "16px",
            padding: "2rem",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <h4 style={{ color: "#e94560", marginBottom: "1rem" }}>Error</h4>
          <p>{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/community")}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "600",
              marginTop: "1rem",
            }}
          >
            Back to Community
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#ffffff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: -1 }}>
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "10%",
            width: "40%",
            height: "40%",
            background: "radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 70%)",
            filter: "blur(60px)",
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "30%",
            height: "30%",
            background: "radial-gradient(circle, rgba(233, 69, 96, 0.1) 0%, rgba(233, 69, 96, 0) 70%)",
            filter: "blur(60px)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div
        style={{
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          padding: "15px 0",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col xs={6} className="d-flex align-items-center">
              <div
                style={{
                  background: "#e94560",
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/community")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                  <path
                    d="M12 19L5 12L12 5"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span
                style={{
                  marginLeft: "12px",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                }}
              >
                {group?.name || "Group Chat"}
              </span>
            </Col>
            <Col xs={6} className="d-flex justify-content-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLeaveGroup}
                style={{
                  background: "rgba(233, 69, 96, 0.15)",
                  border: "1px solid rgba(233, 69, 96, 0.3)",
                  color: "#e94560",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="#e94560"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="#e94560"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H9"
                    stroke="#e94560"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Leave Group
              </motion.button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="my-4 d-flex flex-column" style={{ flex: 1 }}>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>{group?.name}</h4>
          <p style={{ opacity: "0.8", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            {group?.description || "No description provided"}
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              fontSize: "0.85rem",
              opacity: "0.7",
            }}
          >
            <span>Created by: {group?.createdBy?.name}</span>
            <span>|</span>
            <span>{group?.members?.length || 0} members</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMembers(!showMembers)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#ffffff",
                padding: "4px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8rem",
                marginLeft: "10px",
              }}
            >
              {showMembers ? "Hide Members" : "View Members"}
            </motion.button>
          </div>

          {showMembers && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: "1rem",
                background: "rgba(0,0,0,0.2)",
                borderRadius: "8px",
                padding: "10px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <h6 style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>Group Members</h6>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group?.members?.map((member) => (
                  <div
                    key={member._id}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "#4361ee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.6rem",
                        fontWeight: "bold",
                      }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    {member.name}
                    {member._id === group?.createdBy?._id && (
                      <span
                        style={{
                          fontSize: "0.65rem",
                          background: "rgba(233, 69, 96, 0.2)",
                          color: "#e94560",
                          padding: "2px 5px",
                          borderRadius: "4px",
                        }}
                      >
                        Admin
                      </span>
                    )}
                    {member._id === user?._id && (
                      <span
                        style={{
                          fontSize: "0.65rem",
                          background: "rgba(67, 97, 238, 0.2)",
                          color: "#4361ee",
                          padding: "2px 5px",
                          borderRadius: "4px",
                        }}
                      >
                        You
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "1.5rem",
            marginBottom: "1.5rem",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              overflowY: "auto",
              flex: 1,
              paddingRight: "10px",
            }}
          >
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message._id}
                  style={{
                    marginBottom: "1.2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: user?._id === message.sender._id ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      background:
                        user?._id === message.sender._id
                          ? "rgba(67, 97, 238, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                      border:
                        user?._id === message.sender._id
                          ? "1px solid rgba(67, 97, 238, 0.3)"
                          : "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      padding: "0.8rem 1.2rem",
                      maxWidth: "70%",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        marginBottom: "0.3rem",
                        color: user?._id === message.sender._id ? "#4361ee" : "#e94560",
                      }}
                    >
                      {message.sender.name} {user?._id === message.sender._id && "(You)"}
                    </div>
                    <div style={{ wordBreak: "break-word" }}>{message.content}</div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      opacity: "0.6",
                      marginTop: "0.3rem",
                      marginLeft: user?._id === message.sender._id ? 0 : "0.5rem",
                      marginRight: user?._id === message.sender._id ? "0.5rem" : 0,
                    }}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem 0",
                  opacity: "0.6",
                }}
              >
                No messages yet. Be the first to start the conversation!
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: "1rem",
          }}
        >
          <Form onSubmit={handleSendMessage}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #4361ee, #3f37c9)",
                  border: "none",
                  color: "#ffffff",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50px",
                }}
                disabled={!newMessage.trim()}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          </Form>
        </div>
      </Container>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1100,
          transform: "translateY(200%)",
          transition: "transform 0.3s ease-in-out",
          display: "none",
        }}
        id="messageNotification"
      >
        <div
          style={{
            background: "rgba(67, 97, 238, 0.9)",
            backdropFilter: "blur(10px)",
            padding: "12px 20px",
            borderRadius: "10px",
            color: "#ffffff",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>New message received</span>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;