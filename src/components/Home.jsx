import React from "react";
import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      {/* Animated Heading */}
      <motion.h1
        className="display-3 fw-bold text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to InsightLens
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        className="lead text-secondary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Search and analyze research trends effectively.
      </motion.p>

      {/* Call-to-Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </motion.div>
    </Container>
  );
};

export default Home;
