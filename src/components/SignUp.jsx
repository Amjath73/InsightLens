import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Navbar, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate(); // ✅ For navigation

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

  const backgroundStyle = {
    backgroundImage: 'url("https://img.freepik.com/premium-photo/worktable-with-computer-laptop-notepad-coffee-cup-morning_254791-1228.jpg")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

              {/* 🔹 Sign In Option */}
              <div className="text-center mt-3">
                <span className="text-muted">Already have an account?</span>
                <Button 
                  variant="link" 
                  className="p-0 ms-1 text-primary"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
