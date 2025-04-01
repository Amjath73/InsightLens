import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  // Function to fetch user data
  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        navigate("/signin");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/users");
      const foundUser = response.data.find(user => user.email === userEmail);

      if (!foundUser) {
        localStorage.removeItem("userEmail");
        navigate("/signin");
        return;
      }

      setUserData(foundUser);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]); // Added navigate to dependency array

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userToken");
    localStorage.removeItem("redirectPath");
    navigate("/signin");
  };

  // Handle search navigation
  const handleSearch = () => {
    console.log('object')
    navigate("/search");
  };

  // Add these new handlers
  const handleRemovePaper = async (paperId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userData._id}/papers/${paperId}`);
      fetchUserData();
    } catch (err) {
      console.error("Error removing paper:", err);
    }
  };

  const handleSearchClick = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const navigateToCommunity = () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      localStorage.setItem("redirectPath", "/community"); // Store the intended destination
      navigate("/signin");
    } else {
      navigate("/community");
    }
  };

  if (isLoading) {
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
          <div style={{ fontSize: "1.2rem", fontWeight: "500" }}>Loading your profile...</div>
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
      <div style={{ 
        background: "linear-gradient(135deg, #1a1a2e, #16213e)", 
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        flexDirection: "column"
      }}>
        <div style={{ 
          fontSize: "3rem", 
          marginBottom: "1rem", 
          color: "#e94560" 
        }}>
          ⚠️
        </div>
        <div style={{ 
          fontSize: "1.5rem", 
          fontWeight: "600", 
          marginBottom: "1rem", 
          textAlign: "center",
          maxWidth: "500px"
        }}>
          {error}
        </div>
        <button
          onClick={() => fetchUserData()}
          style={{
            backgroundColor: "#e94560",
            color: "#ffffff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 10px 20px rgba(233, 69, 96, 0.3)",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 15px 25px rgba(233, 69, 96, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(233, 69, 96, 0.3)";
          }}
        >
          Try Again
        </button>
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
          zIndex: -1 // Ensure it stays behind interactive elements
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
        <div style={{
          position: "absolute",
          width: "100%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
          top: "20%"
        }} />
        <div style={{
          position: "absolute",
          width: "100%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
          bottom: "20%"
        }} />
      </div>

      {/* Top navigation bar */}
      <div style={{
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000, // Increased z-index to ensure it is above other elements
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
                Account
              </span>
            </Col>
            <Col xs={6} className="d-flex justify-content-end">
              {/* Added navigation buttons to top bar */}
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt-4">
        <Row>
          {/* Left sidebar */}
          <Col lg={3} md={4} className="mb-4">
            <div style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.05)",
              overflow: "hidden"
            }}>
              <div className="text-center p-4" style={{
                background: "rgba(255,255,255,0.02)",
                borderBottom: "1px solid rgba(255,255,255,0.05)"
              }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e94560, #4361ee)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    margin: "0 auto 1rem",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
                  }}
                >
                  {userData?.name?.charAt(0).toUpperCase() || "U"}
                </motion.div>
                <h3 style={{ 
                  fontWeight: "700",
                  marginBottom: "0.5rem"
                }}>
                  {userData?.name || "User"}
                </h3>
                <div style={{ 
                  background: "rgba(67, 97, 238, 0.2)",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  display: "inline-block",
                  fontSize: "0.8rem"
                }}>
                  <span style={{ color: "#4361ee", fontWeight: "600" }}>Member</span>
                </div>
              </div>

              <div className="p-3">
                {[
                  { id: "profile", label: "Profile", icon: "👤" },
                  { id: "activity", label: "Activity", icon: "📊" },
                ].map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "8px",
                      margin: "4px 0",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      background: activeTab === item.id ? "rgba(255,255,255,0.08)" : "transparent",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      if (activeTab !== item.id) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (activeTab !== item.id) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <span style={{ marginRight: "12px", fontSize: "1.2rem" }}>{item.icon}</span>
                    <span style={{ fontWeight: activeTab === item.id ? "600" : "400" }}>{item.label}</span>
                    {activeTab === item.id && (
                      <div style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#e94560",
                        marginLeft: "auto"
                      }}></div>
                    )}
                  </div>
                ))}
                
                {activeTab === "activity" && (
                  <>
                    
                  </>
                )}
              </div>
              
              {/* Sidebar buttons - Only logout remains */}
              <div className="p-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}  
                  style={{
                    background: "rgba(233, 69, 96, 0.15)",
                    border: "1px solid rgba(233, 69, 96, 0.3)",
                    color: "#e94560",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    justifyContent: "center"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8L19 12M19 12L15 16M19 12H9M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#e94560" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Logout
                </motion.button>
              </div>
            </div>
          </Col>

          {/* Main content area */}
          <Col lg={9} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === "profile" && (
                <div>
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "1.5rem",
                    marginBottom: "1.5rem"
                  }}>
                    <h4 style={{ 
                      fontWeight: "600", 
                      marginBottom: "1.5rem",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <span style={{ 
                        background: "#e94560", 
                        width: "12px", 
                        height: "24px", 
                        borderRadius: "3px",
                        marginRight: "12px",
                        display: "inline-block"
                      }}></span>
                      Personal Information
                    </h4>
                    
                    <Row className="mt-4">
                      {[
                        { label: "Full Name", value: userData?.name || "Not provided" },
                        { label: "Email Address", value: userData?.email || "Not provided" },
                        { label: "Phone Number", value: userData?.phone || "Not provided" },
                        { label: "Location", value: userData?.place || "Not provided" }
                      ].map((item, index) => (
                        <Col key={index} md={6} className="mb-4">
                          <div style={{ opacity: 0.7, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                            {item.label}
                          </div>
                          <div style={{ 
                            fontWeight: "500", 
                            fontSize: "1rem",
                            background: "rgba(255,255,255,0.05)",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.05)"
                          }}>
                            {item.value}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "1.5rem",
                    marginBottom: "1.5rem"
                  }}>
                    <h4 style={{ 
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
                      Account Statistics
                    </h4>
                    
                    <Row className="mt-3">
                      {[
                        { label: "Member Since", value: "March 2025", icon: "🗓️" },
                        { label: "Last Login", value: "Today", icon: "🔑" },
                        { label: "Account Type", value: "Standard", icon: "⭐" },
                        { label: "Status", value: "Active", icon: "✅" }
                      ].map((item, index) => (
                        <Col key={index} md={6} lg={3} className="mb-4">
                          <div style={{
                            background: "rgba(255,255,255,0.02)",
                            borderRadius: "12px",
                            padding: "1rem",
                            height: "100%",
                            border: "1px solid rgba(255,255,255,0.05)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center"
                          }}>
                            <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>
                              {item.icon}
                            </div>
                            <div style={{ opacity: 0.7, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                              {item.label}
                            </div>
                            <div style={{ fontWeight: "600" }}>
                              {item.value}
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  {/* New Search Section */}
                  <div style={{
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "1.5rem",
                    marginBottom: "1.5rem",
                    textAlign: "center"
                  }}>
                    <h4 style={{ 
                      fontWeight: "600", 
                      marginBottom: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <span style={{ 
                        background: "#4361ee", 
                        width: "12px", 
                        height: "24px", 
                        borderRadius: "3px",
                        marginRight: "12px",
                        display: "inline-block"
                      }}></span>
                      Start Your Research
                    </h4>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSearch}
                      style={{
                        background: "linear-gradient(135deg, #4361ee, #3f37c9)",
                        border: "none",
                        color: "#ffffff",
                        padding: "20px 40px",
                        borderRadius: "30px",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        margin: "0 auto",
                        boxShadow: "0 10px 20px rgba(67, 97, 238, 0.3)",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.boxShadow = "0 15px 25px rgba(67, 97, 238, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow = "0 10px 20px rgba(67, 97, 238, 0.3)";
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 21L16.65 16.65" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Start Exploring Research Papers
                    </motion.button>
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px"
                }}>
                  <h4 style={{ 
                    fontWeight: "600", 
                    marginBottom: "2rem",
                    textAlign: "center"
                  }}>
                    Join Our Research Community
                  </h4>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={navigateToCommunity}
                    style={{
                      width: '80%',
                      maxWidth: '400px',
                      background: "linear-gradient(135deg, #4361ee, #3f37c9)",
                      border: "none",
                      padding: "20px",
                      borderRadius: "12px",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      boxShadow: "0 8px 16px rgba(67, 97, 238, 0.3)"
                    }}
                  >
                    👥 Join Community Groups
                  </motion.button>
                  
                  
                </div>
              )}

            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;