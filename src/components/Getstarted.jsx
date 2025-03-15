import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

const Getstarted = () => {
  const navigate = useNavigate();

  return (
    <div className="getstarted-page" style={{ 
      background: "#1a1a2e", 
      minHeight: "100vh",
      color: "#ffffff",
      overflow: "hidden",
      position: "relative"
    }}>
      {/* Animated background elements */}
      <div className="background-elements" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <motion.div 
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(67, 97, 238, 0.2) 0%, rgba(67, 97, 238, 0) 70%)",
            top: "15%",
            right: "10%",
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
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(233, 69, 96, 0.15) 0%, rgba(233, 69, 96, 0) 70%)",
            bottom: "5%",
            left: "10%",
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

      {/* Header/Navigation */}
      <Container fluid className="p-0">
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
          </Row>
        </motion.div>

        {/* Main Content */}
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={7} xl={6}>
              <motion.div
                className="text-center mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 style={{ 
                  fontSize: "3rem", 
                  fontWeight: "800",
                  lineHeight: "1.2",
                  marginBottom: "1.5rem",
                  color: "#ffffff"
                }}>
                  Ready to <span style={{ color: "#e94560" }}>transform</span> your research?
                </h1>
                <p style={{ 
                  fontSize: "1.1rem", 
                  lineHeight: "1.6",
                  marginBottom: "2rem",
                  opacity: 0.8
                }}>
                  Join thousands of researchers who accelerate their discoveries with AI-powered analysis.
                </p>
              </motion.div>

              <motion.div
                className="p-4 rounded"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                
                <div className="d-flex flex-column gap-3 mt-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <button 
                      onClick={() => navigate("/signin")}
                      className="w-100 py-3 mb-3 rounded-lg text-white font-weight-bold"
                      style={{
                        backgroundColor: "#e94560",
                        border: "none",
                        boxShadow: "0 10px 20px rgba(233, 69, 96, 0.3)",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 15px 25px rgba(233, 69, 96, 0.4)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 20px rgba(233, 69, 96, 0.3)";
                      }}
                    >
                      Sign In
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <button 
                      onClick={() => navigate("/signup")}
                      className="w-100 py-3 mb-2 rounded-lg font-weight-bold"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "#ffffff",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 15px 25px rgba(0,0,0,0.15)";
                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                      }}
                    >
                      Create Account
                    </button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="mt-5 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Getstarted;