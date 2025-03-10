import React from "react";
import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-3"> {/* Reduced top margin */}
      {/* Animated Heading */}
      <motion.h2
        className="fw-bold text-primary"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to InsightLens
      </motion.h2>

      {/* Animated Subtitle */}
      <motion.p
        className="text-secondary mb-3"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ fontSize: "1rem" }}
      >
        Search and analyze research trends effectively.
      </motion.p>

      {/* Smaller Image */}
      <motion.img
        src="https://cdn.open-pr.com/R/a/Ra0876917_g.jpg"
        alt="Research and Technology"
        className="img-fluid rounded shadow"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{ maxWidth: "70%", height: "auto", borderRadius: "10px", marginBottom: "15px" }}
      />

      {/* Call-to-Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Button variant="primary" size="md" onClick={() => navigate("get")}>
          Get Started
        </Button>
      </motion.div>
    </Container>
  );
};

export default Home;
