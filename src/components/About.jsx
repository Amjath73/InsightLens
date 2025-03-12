import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Container className="mt-5 text-center" style={{ backgroundColor: "#f8e8d4", padding: "20px", borderRadius: "10px" }}>
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

      {/* Features Section with Cards */}
      <Row className="mt-4">
        <Col md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Card className="shadow-sm border-0">
              <Card.Img variant="top" src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1356&h=668&fit=crop" />
              <Card.Body>
                <Card.Title>Advanced Paper Search</Card.Title>
                <Card.Text>
                  Search for research papers using keywords, topics, and author names efficiently.
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Card className="shadow-sm border-0">
              <Card.Img variant="top" src="https://png.pngtree.com/thumb_back/fh260/background/20241128/pngtree-a-magnifying-glass-over-colorful-graph-depicting-analysis-research-and-insights-image_16689679.jpg" />
              <Card.Body>
                <Card.Title>Visualized Research Trends</Card.Title>
                <Card.Text>
                  Interactive charts display the latest trends in academic research fields.
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Card className="shadow-sm border-0">
              <Card.Img variant="top" src="https://img.lovepik.com/bg/20240407/Background-of-User-Interface-for-GPS-Tracking-and-Position-Detection_5802897_wh860.jpg!/fw/860" />
              <Card.Body>
                <Card.Title>Citation Tracking</Card.Title>
                <Card.Text>
                  Track citations, author insights, and academic references seamlessly.
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
