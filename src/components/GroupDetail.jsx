import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GroupChat from "./GroupChat";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

function GroupDetail() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`http://localhost:5000/api/groups/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGroup(response.data);
      } catch (err) {
        setError("Failed to load group details");
        console.error("Error:", err);
      }
    };

    fetchGroup();
  }, [groupId]);

  if (error) return (
    <div style={{ 
      marginTop: "60px",
      color: 'red',
      padding: "2rem",
      textAlign: "center" 
    }}>{error}</div>
  );

  if (!group) return (
    <div style={{ 
      marginTop: "60px",
      padding: "2rem",
      textAlign: "center",
      color: "#ffffff"
    }}>Loading...</div>
  );

  return (
    <div style={{ 
      marginTop: "60px",
      background: "linear-gradient(135deg, #1a1a2e, #16213e)",
      minHeight: "calc(100vh - 60px)",
      color: "#ffffff"
    }}>
      {/* Members Section */}
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
                padding: "1.5rem",
                marginTop: "2rem",
                marginBottom: "2rem"
              }}
            >
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
                  marginRight: "12px"
                }}></span>
                Group Members
              </h3>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem"
              }}>
                {group.members.map(member => (
                  <motion.div
                    key={member._id}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      padding: "0.8rem 1.2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <div style={{
                      background: "linear-gradient(135deg, #4361ee, #3f37c9)",
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      fontWeight: "600"
                    }}>
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: "500" }}>{member.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Chat Section */}
      <GroupChat groupId={groupId} />
    </div>
  );
}

export default GroupDetail;
