import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { motion } from "framer-motion";

const Community = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupData, setNewGroupData] = useState({ name: "", description: "" });

  // Get token
  const getToken = () => {
    return localStorage.getItem("userToken"); // Adjust based on how you store the token
  };

  // Fetch all community groups
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/groups");
      setGroups(response.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setError("Failed to load community groups. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Handle creating a new group
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        navigate("/signin");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/groups", 
        newGroupData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setShowCreateModal(false);
      setNewGroupData({ name: "", description: "" });
      fetchGroups(); // Refresh the groups list
    } catch (err) {
      console.error("Error creating group:", err);
      setError(err.response?.data?.message || "Failed to create group. Please try again.");
    }
  };

  // Handle joining a group
  const handleJoinGroup = async (groupId) => {
    try {
      const token = getToken();
      if (!token) {
        navigate("/signin");
        return;
      }

      await axios.post(
        `http://localhost:5000/api/groups/${groupId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Navigate to the group chat
      navigate(`/community/group/${groupId}`);
    } catch (err) {
      console.error("Error joining group:", err);
      setError(err.response?.data?.message || "Failed to join group. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ 
        background: "linear-gradient(135deg, #1a1a2e, #16213e)", 
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff"
      }}>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ 
            width: "60px", 
            height: "60px",
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,0.2)",
            borderTopColor: "#e94560",
            animation: "spin 1s linear infinite",
            marginBottom: "1rem"
          }} />
          <div style={{ fontSize: "1.2rem", fontWeight: "500" }}>Loading community groups...</div>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #1a1a2e, #16213e)", 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: "#ffffff",
      overflow: "hidden",
      position: "relative"
    }}>
      {/* Animated background elements */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: -1 }}>
        <div style={{
          position: "absolute",
          top: "30%",
          left: "10%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 70%)",
          filter: "blur(60px)",
          borderRadius: "50%",
          zIndex: -1
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "30%",
          height: "30%",
          background: "radial-gradient(circle, rgba(233, 69, 96, 0.1) 0%, rgba(233, 69, 96, 0) 70%)",
          filter: "blur(60px)",
          borderRadius: "50%"
        }} />
      </div>

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
            <Col xs={6} className="d-flex align-items-center">
              <div style={{ 
                background: "#e94560",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }} onClick={() => navigate("/")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M15 5L12 2M12 2L9 5M12 2V13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ 
                marginLeft: "12px", 
                fontSize: "1.2rem", 
                fontWeight: "700"
              }}>
                Community
              </span>
            </Col>
            <Col xs={6} className="d-flex justify-content-end">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/profile")}
                style={{
                  background: "rgba(67, 97, 238, 0.15)",
                  border: "1px solid rgba(67, 97, 238, 0.3)",
                  color: "#4361ee",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginRight: "10px"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 21C3 16.5817 7.02944 13 12 13C16.9706 13 21 16.5817 21 21" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Profile
              </motion.button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="my-4">
        {/* Header section */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.05)",
          padding: "2rem",
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          <h2 style={{ fontWeight: "700", marginBottom: "1rem" }}>Research Community</h2>
          <p style={{ maxWidth: "700px", margin: "0 auto 1.5rem", opacity: "0.8" }}>
            Connect with other researchers, discuss papers, and collaborate on projects
            in our community groups. Join existing groups or create your own.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            style={{
              background: "linear-gradient(135deg, #4361ee, #3f37c9)",
              border: "none",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "30px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 10px 20px rgba(67, 97, 238, 0.3)"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create New Group
          </motion.button>
        </div>

        {/* Error message if any */}
        {error && (
          <div style={{
            background: "rgba(233, 69, 96, 0.15)",
            border: "1px solid rgba(233, 69, 96, 0.3)",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1.5rem",
            color: "#e94560"
          }}>
            {error}
          </div>
        )}

        {/* Groups list */}
        <h3 style={{ 
          fontWeight: "600", 
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center"
        }}>
          <span style={{ 
            background: "#4361ee", 
            width: "12px", 
            height: "24px", 
            borderRadius: "3px",
            marginRight: "12px",
            display: "inline-block"
          }}></span>
          Available Groups
        </h3>

        <Row>
          {groups.length > 0 ? (
            groups.map((group) => (
              <Col key={group._id} lg={4} md={6} className="mb-4">
                <motion.div
                  whileHover={{ y: -5 }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "1.5rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1rem"
                    }}>
                      <h4 style={{ fontWeight: "600", color: "#4361ee" }}>{group.name}</h4>
                      <div style={{
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "20px",
                        padding: "4px 10px",
                        fontSize: "0.8rem"
                      }}>
                        {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                      </div>
                    </div>
                    <p style={{ opacity: "0.8", marginBottom: "1rem", minHeight: "60px" }}>
                      {group.description || "No description provided"}
                    </p>
                    <div style={{ fontSize: "0.8rem", opacity: "0.6", marginBottom: "1rem" }}>
                      Created by: {group.createdBy.name}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleJoinGroup(group._id)}
                    style={{
                      background: "rgba(67, 97, 238, 0.15)",
                      border: "1px solid rgba(67, 97, 238, 0.3)",
                      color: "#4361ee",
                      padding: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 12H19" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Join Group
                  </motion.button>
                </motion.div>
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👥</div>
              <p style={{ opacity: "0.7" }}>No community groups available yet. Create the first one!</p>
            </Col>
          )}
        </Row>
      </Container>

      {/* Create Group Modal */}
      <Modal 
        show={showCreateModal} 
        onHide={() => setShowCreateModal(false)}
        centered
        contentClassName="bg-dark text-light"
      >
        <Modal.Header 
          closeButton 
          style={{ 
            background: "linear-gradient(135deg, #1a1a2e, #16213e)", 
            borderBottom: "1px solid rgba(255,255,255,0.1)" 
          }}
        >
          <Modal.Title>Create New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
          <Form onSubmit={handleCreateGroup}>
            <Form.Group className="mb-3">
              <Form.Label>Group Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter group name" 
                value={newGroupData.name}
                onChange={(e) => setNewGroupData({...newGroupData, name: e.target.value})}
                required
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff"
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Describe the purpose of this group"
                value={newGroupData.description}
                onChange={(e) => setNewGroupData({...newGroupData, description: e.target.value})}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff"
                }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button 
                variant="outline-light" 
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                style={{
                  background: "linear-gradient(135deg, #4361ee, #3f37c9)",
                  border: "none"
                }}
              >
                Create Group
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Community;