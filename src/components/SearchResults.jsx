import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaArrowRight, FaFilePdf } from "react-icons/fa";
import { Spinner, Row, Col, Container } from "react-bootstrap";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [directLinkLoading, setDirectLinkLoading] = useState({});
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);

    try {
      const response = await fetch(`http://127.0.0.1:5001/api/papers?query=${query}`);
      const data = await response.json();
      const combinedResults = [...(data.dbPapers || []), ...(data.scrapedPapers || [])];
      setResults(combinedResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSummary = async (paper) => {
    setSummaryLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5002/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: paper.snippet || paper.title }),
      });

      const data = await response.json();
      if (data.summary) {
        openSummaryWindow(paper.title, data.summary);
      } else {
        alert("Error fetching summary.");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleViewPaper = async (paper, index) => {
    if (paper.link) {
      window.open(paper.link, '_blank');
      return;
    }

    setDirectLinkLoading(prev => ({ ...prev, [index]: true }));
    try {
      const response = await fetch('http://127.0.0.1:5001/api/paper-direct-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: paper.title,
          authors: paper.authors,
          source: paper.source 
        })
      });

      const data = await response.json();
      if (data.directUrl) {
        window.open(data.directUrl, '_blank');
      } else {
        alert('Could not find direct link to paper');
      }
    } catch (error) {
      console.error('Error getting direct link:', error);
      alert('Error accessing paper');
    } finally {
      setDirectLinkLoading(prev => ({ ...prev, [index]: false }));
    }
  };

  const openSummaryWindow = (title, summary) => {
    const newWindow = window.open("", "_blank", "width=600,height=400");
    newWindow.document.write(`
      <html>
        <head>
          <title>Research Paper Summary</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              background-color: #1a1a2e;
              color: #ffffff;
            }
            h2 { color: #e94560; }
            p { line-height: 1.6; }
            .controls {
              display: flex;
              gap: 10px;
              margin-bottom: 20px;
            }
            button {
              background: #4361ee;
              border: none;
              padding: 8px 16px;
              border-radius: 8px;
              color: white;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            button:hover {
              opacity: 0.9;
            }
            button:disabled {
              background: #666;
              cursor: not-allowed;
            }
            .speech-status {
              color: #e94560;
              font-size: 0.9rem;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          <div class="controls">
            <button id="playButton" onclick="toggleSpeech()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play
            </button>
            <button id="pauseButton" onclick="pauseSpeech()" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
              Pause
            </button>
            <button id="stopButton" onclick="stopSpeech()" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h12v12H6z"/>
              </svg>
              Stop
            </button>
          </div>
          <p id="summaryText">${summary}</p>
          <div id="status" class="speech-status"></div>

          <script>
            let speech = null;
            let isPaused = false;
            const playBtn = document.getElementById('playButton');
            const pauseBtn = document.getElementById('pauseButton');
            const stopBtn = document.getElementById('stopButton');
            const status = document.getElementById('status');

            function toggleSpeech() {
              if (speech && !isPaused) {
                return;
              }

              if (isPaused) {
                speech.resume();
                isPaused = false;
                updateStatus('Reading...');
                return;
              }

              speech = new SpeechSynthesisUtterance();
              speech.text = document.getElementById('summaryText').textContent;
              speech.rate = 0.9;
              speech.pitch = 1;
              
              speech.onstart = () => {
                playBtn.disabled = true;
                pauseBtn.disabled = false;
                stopBtn.disabled = false;
                updateStatus('Reading...');
              };

              speech.onend = () => {
                resetControls();
                updateStatus('Finished reading');
              };

              speech.onpause = () => {
                updateStatus('Paused');
              };

              speech.onresume = () => {
                updateStatus('Reading...');
              };

              window.speechSynthesis.speak(speech);
            }

            function pauseSpeech() {
              if (speech) {
                window.speechSynthesis.pause();
                isPaused = true;
                playBtn.disabled = false;
                updateStatus('Paused');
              }
            }

            function stopSpeech() {
              if (speech) {
                window.speechSynthesis.cancel();
                resetControls();
                updateStatus('Stopped');
              }
            }

            function resetControls() {
              playBtn.disabled = false;
              pauseBtn.disabled = true;
              stopBtn.disabled = true;
              isPaused = false;
              speech = null;
            }

            function updateStatus(message) {
              status.textContent = message;
            }

            // Cleanup when window closes
            window.onbeforeunload = () => {
              if (speech) {
                window.speechSynthesis.cancel();
              }
            };
          </script>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/profile");
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
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <motion.div 
          style={{
            position: "absolute",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(233, 69, 96, 0.15) 0%, rgba(233, 69, 96, 0) 70%)",
            top: "15%",
            right: "5%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
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
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 70%)",
            bottom: "10%",
            left: "5%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Header/Navigation Area */}
      <motion.div 
        className="py-4 px-4 px-md-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Row className="align-items-center">
          <Col xs={6} md={4}>
            <div className="d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
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
          <Col xs={6} md={8} className="d-flex justify-content-end gap-3">
            <button
              onClick={handleProfileClick}
              style={{
                background: "rgba(233, 69, 96, 0.15)",
                border: "1px solid rgba(233, 69, 96, 0.3)",
                padding: "8px 16px",
                borderRadius: "8px",
                color: "#e94560",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.9rem",
                fontWeight: "600",
                zIndex: 100
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Profile
            </button>
          </Col>
        </Row>
      </motion.div>

      <Container fluid className="py-4 px-4 px-md-5">
        {/* Search Header */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ 
            fontSize: "2.8rem", 
            fontWeight: "700",
            marginBottom: "1rem",
          }}>
            <span style={{ color: "#e94560" }}>Explore</span> Research Papers
          </h1>
          <p style={{ 
            fontSize: "1.1rem", 
            opacity: 0.8, 
            maxWidth: "600px", 
            margin: "0 auto" 
          }}>
            Search for cutting-edge research and get AI-powered insights
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="d-flex justify-content-center">
            <div style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              padding: "20px",
              width: "100%",
              maxWidth: "700px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}>
              <div className="d-flex">
                <input
                  type="text"
                  placeholder="Enter your research topic..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    fontSize: "1rem",
                    color: "#ffffff",
                    flex: 1,
                    outline: "none"
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <motion.button
                  onClick={handleSearch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  style={{
                    background: "#e94560",
                    borderRadius: "8px",
                    border: "none",
                    padding: "12px 24px",
                    marginLeft: "10px",
                    color: "#ffffff",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>
                      <FaSearch style={{ marginRight: "8px" }} />
                      Search
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading Indicator */}
        {loading && (
          <motion.div
            className="text-center my-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(5px)",
              borderRadius: "12px",
              padding: "30px",
              maxWidth: "400px",
              margin: "0 auto",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <Spinner animation="border" variant="danger" style={{ width: "3rem", height: "3rem" }} />
              <p className="mt-3 mb-0" style={{ fontSize: "1.1rem", opacity: 0.8 }}>Searching for research papers...</p>
              <div className="mt-3 position-relative" style={{ height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px" }}>
                <motion.div
                  style={{ 
                    height: "100%", 
                    background: "linear-gradient(90deg, #e94560, #4361ee)",
                    borderRadius: "3px",
                    position: "absolute",
                    top: 0,
                    left: 0
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Row>
              {results.length > 0 ? (
                results.map((paper, index) => (
                  <Col lg={4} md={6} className="mb-4" key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(5px)",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.05)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        position: "relative"
                      }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 15px 30px rgba(0,0,0,0.25)"
                      }}
                      onClick={() => handleViewPaper(paper, index)}
                    >
                      <div style={{ 
                        height: "150px",
                        position: "relative",
                        overflow: "hidden"
                      }}>
                        <div style={{ 
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(135deg, rgba(67, 97, 238, 0.5), rgba(233, 69, 96, 0.5))",
                          zIndex: 1
                        }} />
                        <div style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          padding: "0 20px"
                        }}>
                          <FaFilePdf size={32} style={{ marginBottom: "10px" }} />
                          <div style={{ fontWeight: "600", textAlign: "center" }}>Research Paper</div>
                        </div>
                      </div>
                      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <h3 style={{ 
                          fontSize: "1.1rem", 
                          fontWeight: "600", 
                          marginBottom: "10px", 
                          color: "#e94560" 
                        }}>
                          {paper.title.length > 70 ? paper.title.slice(0, 67) + "..." : paper.title}
                        </h3>
                        {paper.authors && (
                          <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "10px" }}>
                            {paper.authors}
                          </p>
                        )}
                        {paper.snippet && (
                          <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "15px", flex: 1 }}>
                            {paper.snippet.length > 120 ? `${paper.snippet.slice(0, 120)}...` : paper.snippet}
                          </p>
                        )}
                        
                        <motion.button
                          onClick={() => handleGetSummary(paper)}
                          disabled={summaryLoading}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            background: "rgba(67, 97, 238, 0.2)",
                            border: "1px solid rgba(67, 97, 238, 0.3)",
                            borderRadius: "8px",
                            padding: "10px 16px",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "500",
                            marginTop: "auto",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                          }}
                        >
                          {summaryLoading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <>
                              Get Summary <FaArrowRight style={{ marginLeft: "8px", fontSize: "14px" }} />
                            </>
                          )}
                        </motion.button>
                      </div>
                      {directLinkLoading[index] && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(0,0,0,0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '12px',
                          zIndex: 10
                        }}>
                          <Spinner animation="border" variant="light" />
                        </div>
                      )}
                    </motion.div>
                  </Col>
                ))
              ) : (
                <Col xs={12}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(5px)",
                      borderRadius: "12px",
                      padding: "40px 20px",
                      textAlign: "center",
                      border: "1px solid rgba(255,255,255,0.05)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                    }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🔍</div>
                    <h3 style={{ marginBottom: "15px", fontSize: "1.5rem", fontWeight: "600" }}>No Results Found</h3>
                    <p style={{ maxWidth: "500px", margin: "0 auto", opacity: 0.7 }}>
                      Try searching for a different term or explore our featured research topics.
                    </p>
                    
                    <div className="d-flex flex-wrap justify-content-center mt-4 gap-2">
                      {["AI Ethics", "Climate Science", "Quantum Computing", "Neuroscience"].map((topic, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "20px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            border: "1px solid rgba(255,255,255,0.1)"
                          }}
                          onClick={() => {
                            setQuery(topic);
                            handleSearch();
                          }}
                        >
                          {topic}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </Col>
              )}
            </Row>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          className="mt-5 pt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingBottom: "20px"
          }}
        >
          <p style={{ opacity: 0.6, fontSize: "0.9rem" }}>
            InsightLens Research Platform — Discover knowledge faster
          </p>
          <div className="d-flex justify-content-center gap-4 mt-3">
            {[""].map((item, i) => (
              <span key={i} style={{ opacity: 0.6, fontSize: "0.9rem", cursor: "pointer" }}>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default SearchResults;