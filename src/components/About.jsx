import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Container className="mt-5 text-center">
      {/* Animated Heading */}
      <motion.h1
        className="fw-bold text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About InsightLens
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-muted mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        InsightLens is a powerful research trend analyzer designed to help 
        students, researchers, and professionals stay updated with the latest 
        academic advancements. By leveraging web scraping and machine learning, 
        InsightLens identifies emerging topics and research patterns.
      </motion.p>

      {/* Features Section */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h4 className="text-dark">Key Features:</h4>
        <ul className="list-unstyled">
          <li>🔍 <strong>Advanced Research Paper Search</strong></li>
          <li>📊 <strong>Visualized Research Trends</strong></li>
          <li>📚 <strong>Citation Tracking & Author Insights</strong></li>
        </ul>
      </motion.div>
    </Container>
  );
};

export default About;
