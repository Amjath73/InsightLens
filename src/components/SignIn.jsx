import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
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
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userToken", data.token); // Fix: usertoken -> userToken
        setSuccessMessage("Login successful! Redirecting...");
        
        // Check if there's a redirect path stored
        const redirectPath = localStorage.getItem("redirectPath");
        localStorage.removeItem("redirectPath"); // Clear the stored path
        
        setTimeout(() => {
          navigate(redirectPath || "/profile");
        }, 2000);
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      background: "#16213e", 
      minHeight: "100vh",
      color: "#ffffff",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "80px"
    }}>
      {/* Animated background elements */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <motion.div 
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(233, 69, 96, 0.15) 0%, rgba(233, 69, 96, 0) 70%)",
            top: "10%",
            right: "5%",
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
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(67, 97, 238, 0.15) 0%, rgba(67, 97, 238, 0) 70%)",
            bottom: "5%",
            left: "10%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <motion.div 
        className="position-relative"
        style={{ zIndex: 1, width: "100%", maxWidth: "400px" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo and Brand */}
        <div className="text-center mb-4">
          <div style={{ 
            margin: "0 auto",
            background: "#e94560",
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M15 5L12 2M12 2L9 5M12 2V13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="mt-3" style={{ fontWeight: "700" }}>Welcome Back</h2>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>Sign in to continue to InsightLens</p>
        </div>

        <Container style={{ 
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          {error && <Alert variant="danger" style={{ background: "rgba(220, 53, 69, 0.2)", color: "#fff", border: "1px solid rgba(220, 53, 69, 0.3)" }}>{error}</Alert>}
          {successMessage && <Alert variant="success" style={{ background: "rgba(40, 167, 69, 0.2)", color: "#fff", border: "1px solid rgba(40, 167, 69, 0.3)" }}>{successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "500" }}>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                required 
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  padding: "12px 15px",
                  borderRadius: "8px"
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "500" }}>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Enter your password" 
                required 
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  padding: "12px 15px",
                  borderRadius: "8px"
                }}
              />
            </Form.Group>

            <Button
              variant="none"
              type="submit"
              className="w-100 mt-2"
              disabled={loading}
              style={{
                background: "#e94560",
                color: "#fff",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "600",
                border: "none",
                boxShadow: "0 8px 15px rgba(233, 69, 96, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 20px rgba(233, 69, 96, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 15px rgba(233, 69, 96, 0.3)";
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center mt-4" style={{ color: "rgba(255,255,255,0.7)" }}>
              <span>Don't have an account?</span>
              <Button 
                variant="link" 
                style={{ 
                  color: "#e94560",
                  textDecoration: "none",
                  fontWeight: "600",
                  padding: "0 5px"
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Container>
      </motion.div>
    </div>
  );
}

export default SignIn;