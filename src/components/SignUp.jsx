import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    place: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setError(null);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        setError(data.message || "Signup failed. Please try again.");
        setSuccessMessage(null);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setSuccessMessage(null);
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      background: "#1a1a2e", 
      minHeight: "100vh",
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
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(233, 69, 96, 0.15) 0%, rgba(233, 69, 96, 0) 70%)",
            top: "5%",
            right: "10%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
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
            background: "radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 70%)",
            bottom: "5%",
            left: "5%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Header/Navigation */}
      <motion.div 
        className="py-4 px-4 px-md-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container>
          <div className="d-flex align-items-center">
            <div 
              style={{ 
                background: "#e94560",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
              onClick={() => navigate("/")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M15 5L12 2M12 2L9 5M12 2V13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span 
              style={{ 
                marginLeft: "10px", 
                fontSize: "1.3rem", 
                fontWeight: "700",
                letterSpacing: "0.5px",
                color: "#ffffff",
                cursor: "pointer"
              }}
              onClick={() => navigate("/")}
            >
            </span>
          </div>
        </Container>
      </motion.div>

      {/* Main Content */}
      <Container className="py-4 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Row className="justify-content-center" style={{ width: "100%" }}>
          <Col md={10} lg={8} xl={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                padding: "2rem"
              }}
            >
              <div className="text-center mb-4">
                <h2 style={{ color: "#e94560", fontWeight: "700" }}>Create Your Account</h2>
                <p style={{ opacity: 0.7 }}>Join our community of researchers and unlock powerful insights</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert variant="danger">{error}</Alert>
                </motion.div>
              )}
              
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert variant="success">{successMessage}</Alert>
                </motion.div>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#ffffff", opacity: 0.8 }}>Full Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Enter your full name" 
                        required 
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#ffffff",
                          padding: "0.7rem",
                          borderRadius: "8px"
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#ffffff", opacity: 0.8 }}>Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Enter your email address" 
                        required 
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#ffffff",
                          padding: "0.7rem",
                          borderRadius: "8px"
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#ffffff", opacity: 0.8 }}>Phone Number</Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="10-digit number" 
                        pattern="[0-9]{10}" 
                        required 
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#ffffff",
                          padding: "0.7rem",
                          borderRadius: "8px"
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#ffffff", opacity: 0.8 }}>Location</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="place" 
                        value={formData.place} 
                        onChange={handleChange} 
                        placeholder="Your location" 
                        required 
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#ffffff",
                          padding: "0.7rem",
                          borderRadius: "8px"
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-4">
                      <Form.Label style={{ color: "#ffffff", opacity: 0.8 }}>Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Create a strong password" 
                        required 
                        style={{
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#ffffff",
                          padding: "0.7rem",
                          borderRadius: "8px"
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-3 mt-3" 
                  disabled={loading}
                  style={{
                    backgroundColor: "#e94560",
                    border: "none",
                    fontWeight: "600",
                    borderRadius: "8px",
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
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating your account...
                    </>
                  ) : "Create Account"}
                </Button>

                <div className="text-center mt-4">
                  <p style={{ color: "#ffffff", opacity: 0.7 }}>
                    Already have an account?{" "}
                    <span 
                      onClick={() => navigate("/signin")}
                      style={{ 
                        color: "#e94560", 
                        cursor: "pointer",
                        fontWeight: "600",
                        textDecoration: "none"
                      }}
                    >
                      Sign In
                    </span>
                  </p>
                </div>
              </Form>
            </motion.div>

            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p style={{ fontSize: "0.85rem" }}>
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;