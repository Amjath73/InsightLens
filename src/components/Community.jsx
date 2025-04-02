import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

function Community() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setCurrentUserId(decoded.userId);
    }
    if (!token) {
      navigate("/signin");
      return;
    }
    fetchGroups();
  }, [navigate]);

  const fetchGroups = async () => {
    try {
      console.log("Fetching groups...");
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("http://localhost:5000/api/groups", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Groups response:", response.data);
      setGroups(response.data);
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        navigate("/signin");
      } else {
        setError(err.response?.data?.message || "Failed to load groups");
      }
    }
  };

  const createGroup = async () => {
    if (!groupName) return;

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "http://localhost:5000/api/groups",
        { name: groupName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setGroups([...groups, response.data]);
      setGroupName("");
    } catch (err) {
      console.error("Error creating group:", err);
      setError(err.response?.data?.message || "Failed to create group");
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/signin");
        return;
      }

      console.log('Attempting to join group:', groupId);
      const response = await axios.post(
        `http://localhost:5000/api/groups/${groupId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Join response:', response.data);
      
      if (response.data && response.data._id) {
        await fetchGroups(); // Refresh groups list
        navigate(`/community/group/${groupId}`);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error("Error joining group:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to join group");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm('Are you sure you want to delete this group?')) {
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      console.log('Attempting to delete group:', groupId);
      const response = await axios.delete(
        `http://localhost:5000/api/groups/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200) {
        console.log('Group deleted successfully');
        setGroups(groups.filter(group => group._id !== groupId));
      }
    } catch (err) {
      console.error("Error deleting group:", err.response?.data || err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Failed to delete group. Please try again later."
      );
    }
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #1a1a2e, #16213e)", 
      minHeight: "100vh",
      color: "#ffffff",
    }}>
      {/* Top navigation bar */}
      <div style={{
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: "15px 0"
      }}>
        <Container>
          <Row className="align-items-center">
            <Col xs={12} className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/profile")}
                  style={{ 
                    background: "#e94560",
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    marginRight: "15px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </motion.div>
                <span style={{ 
                  fontSize: "1.2rem", 
                  fontWeight: "700"
                }}>
                  Community
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Page content */}
      <div style={{ padding: "2rem 0" }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  padding: "2rem",
                  marginBottom: "2rem"
                }}
              >
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem"
                }}>
                  <h2 style={{ 
                    fontWeight: "600", 
                    display: "flex",
                    alignItems: "center",
                    margin: 0
                  }}>
                    <span style={{ 
                      background: "#4361ee", 
                      width: "12px", 
                      height: "24px", 
                      borderRadius: "3px",
                      marginRight: "12px"
                    }}></span>
                    Community Groups
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/profile")}
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
                      fontWeight: "600"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back to Profile
                  </motion.button>
                </div>

                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "2rem"
                }}>
                  <input
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      color: "white",
                      width: "70%",
                      marginRight: "1rem"
                    }}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={createGroup}
                    style={{
                      background: "linear-gradient(135deg, #4361ee, #3f37c9)",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                  >
                    Create Group
                  </motion.button>
                </div>

                <div style={{ maxHeight: "500px", overflowY: "auto", padding: "0.5rem" }}>
                  <Row>
                    {groups.map((group) => (
                      <Col key={group._id} md={6} className="mb-4">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ translateY: -5 }}
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            border: "1px solid rgba(255,255,255,0.05)",
                            height: "100%",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                          }}
                        >
                          <div style={{ 
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "1rem"
                          }}>
                            <div style={{
                              background: "linear-gradient(135deg, #4361ee, #3f37c9)",
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.5rem",
                              fontWeight: "600",
                              color: "white",
                              marginRight: "1rem",
                              boxShadow: "0 4px 8px rgba(67, 97, 238, 0.3)"
                            }}>
                              {group.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 style={{ 
                                margin: 0,
                                fontSize: "1.2rem",
                                fontWeight: "600",
                                color: "#ffffff"
                              }}>
                                {group.name}
                              </h3>
                              <small style={{ 
                                color: "rgba(255,255,255,0.6)",
                                fontSize: "0.85rem"
                              }}>
                                Research Group
                              </small>
                            </div>
                          </div>

                          <div style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginTop: "1rem"
                          }}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleJoinGroup(group._id)}
                              style={{
                                flex: 1,
                                background: "linear-gradient(135deg, #4361ee, #3f37c9)",
                                border: "none",
                                padding: "10px",
                                borderRadius: "8px",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px"
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M5 12h14"/>
                              </svg>
                              Join Group
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleDeleteGroup(group._id)}
                              style={{
                                background: "rgba(233, 69, 96, 0.15)",
                                border: "1px solid rgba(233, 69, 96, 0.3)",
                                padding: "10px",
                                width: "40px",
                                borderRadius: "8px",
                                color: "#e94560",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Community;
