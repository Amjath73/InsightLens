import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Navbar, Alert } from 'react-bootstrap';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      console.log("Response Status:", response.status);
      console.log("Response Data:", response);
  
      const data = await response.json();
      console.log("Response JSON:", data);
  
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  const backgroundStyle = {
    backgroundImage: 'url("https://img.freepik.com/premium-photo/worktable-with-computer-laptop-notepad-coffee-cup-morning_254791-1228.jpg")',
    backgroundSize: 'contain', // Adjusts the image size to fit better
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensures the background adapts well
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light overlay effect
  };
  

  return (
    <div style={backgroundStyle}>
      <Container style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', maxWidth: '400px' }}>
        <Navbar bg="light" className="mb-3">
          <Container>
            <Navbar.Brand>Sign Up</Navbar.Brand>
          </Container>
        </Navbar>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        
        <Row className="justify-content-center">
          <Col md={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" size="sm" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" size="sm" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" name="phone" size="sm" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" pattern="[0-9]{10}" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Place</Form.Label>
                <Form.Control type="text" name="place" size="sm" value={formData.place} onChange={handleChange} placeholder="Enter your place" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" size="sm" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;