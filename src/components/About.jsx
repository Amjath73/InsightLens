import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleGetStarted = () => {
    navigate("/get");
  };

  return (
    <div className="about-page" style={{ 
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
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(67, 97, 238, 0.2) 0%, rgba(67, 97, 238, 0) 70%)",
            top: "15%",
            right: "5%",
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
              <div className="d-flex">
                {[""].map((item, index) => (
                  <div key={index} className="mx-3" style={{ 
                    cursor: "pointer", 
                    fontWeight: "500",
                    opacity: index === 1 ? 1 : 0.7,
                    transition: "opacity 0.3s ease"
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* Main Content Area - Our Story */}
        <Row className="mx-0 mt-4 align-items-center">
          <Col md={12} className="px-4 px-md-5 mb-5 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ 
                fontSize: "3.5rem", 
                fontWeight: "800",
                lineHeight: "1.2",
                marginBottom: "1.5rem",
                color: "#ffffff"
              }}>
                <span style={{ color: "#4361ee" }}>Story</span>
              </h1>
              
              <p style={{ 
                fontSize: "1.1rem", 
                lineHeight: "1.6",
                maxWidth: "800px",
                margin: "0 auto 3rem",
                opacity: 0.8
              }}>
                InsightLens was born from a vision to transform how researchers discover and interpret scientific trends.
                By combining advanced AI with intuitive visualizations, we're making research analysis more accessible and powerful.
              </p>
            </motion.div>
          </Col>
        </Row>

        {/* Mission & Values */}
        <Row className="mx-0 align-items-stretch">
          {[
            {
              title: "Our Mission",
              description: "Empower researchers with intelligent tools that accelerate discoveries and break through information overload.",
              icon: "🎯",
              color: "#e94560"
            },
            {
              title: "Our Vision",
              description: "A world where researchers spend less time searching and more time making groundbreaking discoveries.",
              icon: "🔭",
              color: "#4361ee"
            },
            {
              title: "Our Values",
              description: "Accuracy, innovation, accessibility, and a commitment to advancing human knowledge.",
              icon: "✨",
              color: "#43b978"
            }
          ].map((item, index) => (
            <Col md={4} key={index} className="px-4 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "2rem",
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                <div style={{ 
                  fontSize: "2.5rem", 
                  marginBottom: "1rem" 
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  fontSize: "1.5rem", 
                  fontWeight: "700",
                  marginBottom: "1rem",
                  color: item.color
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  opacity: 0.8,
                  lineHeight: "1.6"
                }}>
                  {item.description}
                </p>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Features Section */}
        <Row className="mx-0 mt-5 align-items-center">
          <Col md={12} className="px-4 px-md-5 mb-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 style={{ 
                fontSize: "2.5rem", 
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "1rem",
                color: "#ffffff"
              }}>
                <span style={{ color: "#e94560" }}>Features</span>
              </h2>
            </motion.div>
          </Col>
        </Row>

        <Row className="mx-0 align-items-stretch px-4 px-md-5">
          {[
            {
              title: "Advanced Paper Search",
              description: "Find relevant research papers quickly with our powerful semantic search engine.",
              icon: "🔍",
              delay: 0.8
            },
            {
              title: "Visualized Research Trends",
              description: "See emerging patterns and connections with interactive data visualizations.",
              icon: "📊",
              delay: 1.0
            },
            {
              title: "Citation Tracking",
              description: "Monitor impact and follow the evolution of ideas through citation networks.",
              icon: "📑",
              delay: 1.2
            }
          ].map((feature, index) => (
            <Col md={4} key={index} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <div style={{ 
                  fontSize: "2rem", 
                  marginBottom: "1rem" 
                }}>
                  {feature.icon}
                </div>
                <h4 style={{ 
                  fontSize: "1.25rem", 
                  fontWeight: "600",
                  marginBottom: "0.75rem"
                }}>
                  {feature.title}
                </h4>
                <p style={{ 
                  opacity: 0.7,
                  lineHeight: "1.6",
                  fontSize: "0.95rem"
                }}>
                  {feature.description}
                </p>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Team Section */}
        <Row className="mx-0 mt-5 align-items-center">
          <Col md={12} className="px-4 px-md-5 mb-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <h2 style={{ 
                fontSize: "2.5rem", 
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "3rem",
                color: "#ffffff"
              }}>
                Meet Our <span style={{ color: "#4361ee" }}>Team</span>
              </h2>
            </motion.div>
          </Col>
        </Row>

        <Row className="mx-0 align-items-stretch px-4 px-md-5 mb-5">
          {[
            {
              name: "Person 1",
              role: "Founder & CEO",
              bio: "Desc",
              delay: 1.4
            },
            {
              name: "Person 2",
              role: "Lead Data Scientist",
              bio: "ML expert specialized in natural language processing and trend analysis.",
              delay: 1.5
            },
            {
              name: "Person 3",
              role: "UX Designer",
              bio: "Desc",
              delay: 1.6
            }
          ].map((member, index) => (
            <Col md={4} key={index} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: member.delay, duration: 0.6 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "2rem",
                  height: "100%",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <div 
                  style={{ 
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e94560, #4361ee)",
                    margin: "0 auto 1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem"
                  }}
                >
                  {member.name.charAt(0)}
                </div>
                <h4 style={{ 
                  fontSize: "1.25rem", 
                  fontWeight: "600",
                  marginBottom: "0.5rem"
                }}>
                  {member.name}
                </h4>
                <p style={{ 
                  color: "#e94560",
                  fontWeight: "500",
                  marginBottom: "1rem"
                }}>
                  {member.role}
                </p>
                <p style={{ 
                  opacity: 0.7,
                  lineHeight: "1.6",
                  fontSize: "0.95rem"
                }}>
                  {member.bio}
                </p>
              </motion.div>
            </Col>
          ))}
        </Row>
        {/* Journey Section */}
        <Row className="mx-0 mt-5 align-items-center">
          <Col md={12} className="px-4 px-md-5 mb-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
            >
              <h2 style={{ 
                fontSize: "2.5rem", 
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "2rem",
                color: "#ffffff"
              }}>
                <span style={{ color: "#43b978" }}>Journey</span>
              </h2>
            </motion.div>
          </Col>
        </Row>

        <Row className="mx-0 align-items-stretch px-4 px-md-5 mb-5">
          <Col md={12}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "2rem",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <div className="timeline position-relative">
                {[
                  { year: "2025", title: "The Beginning", description: "InsightLens began as a research project." },
                  { year: "202_", title: "In progress", description: "Coming soon..." }
                  
                ].map((event, index) => (
                  <div key={index} className="timeline-item position-relative mb-4 ps-5">
                    <div className="timeline-marker position-absolute" 
                      style={{ 
                        left: 0, 
                        top: "6px", 
                        width: "14px", 
                        height: "14px", 
                        backgroundColor: "#43b978", 
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.2)"
                      }} 
                    />
                    {index < 4 && (
                      <div className="timeline-line position-absolute" 
                        style={{ 
                          left: "7px", 
                          top: "20px", 
                          width: "2px", 
                          height: "calc(100% + 10px)", 
                          backgroundColor: "rgba(255,255,255,0.1)" 
                        }} 
                      />
                    )}
                    <div className="timeline-content">
                      <h4 style={{ 
                        fontSize: "1.25rem", 
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                        color: "#43b978"
                      }}>
                        {event.title} <span style={{ color: "#e94560", fontSize: "0.9rem", marginLeft: "8px" }}>{event.year}</span>
                      </h4>
                      <p style={{ 
                        opacity: 0.7,
                        lineHeight: "1.6",
                        fontSize: "0.95rem"
                      }}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>

        <Row className="mx-0 align-items-stretch px-4 px-md-5 mb-5">
          {[
            
          ].map((testimonial, index) => (
            <Col md={4} key={index} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: testimonial.delay, duration: 0.6 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <div style={{ 
                  fontSize: "2rem", 
                  marginBottom: "1rem",
                  color: "#e94560"
                }}>
                  ❝
                </div>
                <p style={{ 
                  opacity: 0.9,
                  lineHeight: "1.6",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  marginBottom: "1.5rem"
                }}>
                  {testimonial.quote}
                </p>
                <div>
                  <p style={{ 
                    fontSize: "1rem", 
                    fontWeight: "600",
                    marginBottom: "0.2rem"
                  }}>
                    {testimonial.author}
                  </p>
                  <p style={{ 
                    opacity: 0.7,
                    fontSize: "0.85rem",
                    lineHeight: "1.4",
                    marginBottom: "0"
                  }}>
                    {testimonial.position}<br />
                    {testimonial.university}
                  </p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* FAQ Section */}
        <Row className="mx-0 mt-5 align-items-center">
          <Col md={12} className="px-4 px-md-5 mb-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.7, duration: 0.8 }}
            >
              <h2 style={{ 
                fontSize: "2.5rem", 
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "2rem",
                color: "#ffffff"
              }}>
                Frequently <span style={{ color: "#4361ee" }}>Asked</span> Questions
              </h2>
            </motion.div>
          </Col>
        </Row>

        <Row className="mx-0 align-items-stretch px-4 px-md-5 mb-5">
          <Col md={12}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "2rem",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              {[
                {
                  question: "How does InsightLens compare to traditional research databases?",
                  answer: "Unlike traditional databases, InsightLens uses AI to understand the semantic meaning behind research papers, not just keywords. This allows for more nuanced and relevant search results and trend analysis."
                },
                {
                  question: "Is InsightLens suitable for all research fields?",
                  answer: "Yes! InsightLens is designed to work across disciplines, from life sciences to humanities. Our specialized algorithms adapt to the unique language and citation patterns of different fields."
                },
                {
                  question: "How frequently is the database updated?",
                  answer: "Our database is updated daily with the latest published research from thousands of journals and preprint servers, ensuring you always have access to cutting-edge findings."
                },
                {
                  question: "Can I integrate InsightLens with reference management software?",
                  answer: "Absolutely. InsightLens offers seamless integration with popular reference managers like Zotero, Mendeley, and EndNote, making it easy to organize and cite your discoveries."
                }
              ].map((faq, index) => (
                <div key={index} className="mb-4">
                  <h4 style={{ 
                    fontSize: "1.25rem", 
                    fontWeight: "600",
                    marginBottom: "0.75rem",
                    color: "#4361ee"
                  }}>
                    {faq.question}
                  </h4>
                  <p style={{ 
                    opacity: 0.8,
                    lineHeight: "1.6",
                    fontSize: "0.95rem",
                    paddingLeft: "0.5rem",
                    borderLeft: "2px solid #4361ee"
                  }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </motion.div>
          </Col>
        </Row>

        {/* CTA Section */}
        <motion.div
          className="mt-5 px-4 px-md-5 py-5 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255,255,255,0.05)"
          }}
        >
          <h2 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "700",
            marginBottom: "1.5rem"
          }}>
            Ready to transform your research workflow?
          </h2>
          <p style={{ 
            fontSize: "1.1rem", 
            lineHeight: "1.6",
            maxWidth: "700px",
            margin: "0 auto 2rem",
            opacity: 0.8
          }}>
            Join thousands of researchers worldwide who are discovering breakthrough insights faster with InsightLens.
          </p>
          <button 
            onClick={handleGetStarted}
            className="get-started-btn"
            style={{
              backgroundColor: "#4361ee",
              color: "#ffffff",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "50px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(67, 97, 238, 0.3)",
              transition: "all 0.3s ease"
            }}
          >
            Get Started Now
          </button>
        </motion.div>

        {/* Footer */}
        <Row className="mx-0 mt-4 align-items-center">
          <Col md={12} className="px-4 px-md-5 pb-4 text-center">
            <div className="d-flex justify-content-center mb-3">
              {["Twitter", "LinkedIn", "GitHub", "Contact"].map((item, index) => (
                <div key={index} className="mx-3" style={{ 
                  cursor: "pointer", 
                  fontWeight: "500",
                  opacity: 0.6,
                  transition: "opacity 0.3s ease"
                }}>
                  {item}
                </div>
              ))}
            </div>
            <p style={{ 
              opacity: 0.5,
              fontSize: "0.85rem"
            }}>
              © 2024 InsightLens. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;