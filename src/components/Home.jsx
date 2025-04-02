import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/get");
  };

  return (
    <div className="home-page" style={{ 
      background: "#1a1a2e", 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: "#ffffff",
      overflow: "hidden",
      position: "relative",
      paddingTop: "80px"
    }}>
      {/* Animated background elements */}
      <div className="background-elements" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <motion.div 
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(233, 69, 96, 0.2) 0%, rgba(233, 69, 96, 0) 70%)",
            top: "10%",
            left: "5%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(67, 97, 238, 0.15) 0%, rgba(67, 97, 238, 0) 70%)",
            bottom: "5%",
            right: "10%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <Container fluid className="p-0">
        {/* Header/Navigation Area */}
        <motion.div 
          className="py-4 px-4 px-md-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Row className="align-items-center">
            <Col xs={6} md={4}>
              <div className="d-flex align-items-center">
                <div style={{ 
                  background: "#e94560",
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M15 5L12 2M12 2L9 5M12 2V13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ 
                  marginLeft: "10px", 
                  fontSize: "1.3rem", 
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                  color: "#ffffff" 
                }}>
                
                </span>
              </div>
            </Col>
            <Col xs={6} md={8} className="d-flex justify-content-end">
              <div className="d-none d-md-flex">
                {[""].map((item, index) => (
                  <div key={index} className="mx-3" style={{ 
                    cursor: "pointer", 
                    fontWeight: "500",
                    opacity: 0.8,
                    transition: "opacity 0.3s ease"
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* Main Content Area */}
        <main style={{ flex: "1" }}>
        <Row className="mx-0 mt-4 mt-md-5 align-items-center">
          <Col md={6} className="px-4 px-md-5 mb-5 mb-md-0 order-2 order-md-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ 
                fontSize: "3.5rem", 
                fontWeight: "800",
                lineHeight: "1.2",
                marginBottom: "1.5rem",
                color: "#ffffff"
              }}>
                <span style={{ color: "#e94560" }}>Discover</span> research insights faster
              </h1>
              
              <p style={{ 
                fontSize: "1.1rem", 
                lineHeight: "1.6",
                maxWidth: "450px",
                marginBottom: "2rem",
                opacity: 0.8
              }}>
                Leverage AI-powered analysis tools to identify trends, visualize data, and accelerate your research discoveries.
              </p>
              
              <div className="d-flex flex-wrap gap-3 mb-4">
                {[
                  { icon: "💡", text: "Smart trend detection" },
                  { icon: "📊", text: "Visual data exploration" },
                  { icon: "🔍", text: "Deep insight extraction" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="d-flex align-items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      marginRight: "10px",
                      marginBottom: "10px"
                    }}
                  >
                    <span style={{ marginRight: "8px", fontSize: "1.2rem" }}>{feature.icon}</span>
                    <span style={{ fontWeight: "500" }}>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="d-flex gap-3 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.button 
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: "#e94560",
                    color: "white",
                    padding: "12px 32px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 10px 20px rgba(233, 69, 96, 0.3)",
                    transition: "all 0.3s ease",
                    zIndex: 10
                  }}
                >
                  Get Started Free
                </motion.button>
              </motion.div>
            </motion.div>
          </Col>
          
          <Col md={6} className="px-0 order-1 order-md-2">
            <motion.div
              className="position-relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{
                position: "relative",
                height: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  width: "600px",
                  height: "600px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #e94560, #4361ee)",
                  left: "40%",
                  filter: "blur(60px)",
                  opacity: 0.4
                }}></div>
                
                <img
                  src="https://cdn.open-pr.com/R/a/Ra0876917_g.jpg"
                  alt="Research Analytics Dashboard"
                  style={{
                    maxWidth: "90%",
                    borderRadius: "12px",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                    transform: "perspective(1000px) rotateY(-10deg) rotateX(5deg)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                />
              </div>
            </motion.div>
          </Col>
        </Row>
        </main>
        
        {/* Stats Section */}
        <motion.div
          className="mt-5 px-4 px-md-5 py-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255,255,255,0.05)"
          }}
        >
          <Row className="justify-content-center text-center">
            {[
              { number: "98%", label: "Accuracy Rate" },
            ].map((stat, index) => (
              <Col key={index} xs={6} md={3} className="mb-4 mb-md-0">
                <div style={{ fontSize: "2.5rem", fontWeight: "700", color: "#e94560" }}>
                  {stat.number}
                </div>
                <div style={{ opacity: 0.7, fontWeight: "500" }}>
                  {stat.label}
                </div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default Home;