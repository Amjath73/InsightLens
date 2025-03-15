import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  // Add styles to fix the gap issue directly in the component
  useEffect(() => {
    // Add CSS to document body and html
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.margin = "0";
    
    // Apply styles to root element
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.display = "flex";
      rootElement.style.flexDirection = "column";
      rootElement.style.minHeight = "100vh";
    }
    
    // Find main content area - typically comes after navbar and before footer
    const mainContent = document.querySelector('main') || 
                        rootElement?.querySelector(':not(nav):not(footer)');
    if (mainContent) {
      mainContent.style.flex = "1 0 auto";
    }
    
    // Cleanup function
    return () => {
      // Reset styles if component unmounts (optional)
    };
  }, []);

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="footer py-4"
      style={{ 
        background: "#1a1a2e",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        position: "relative",
        width: "100%",
        marginTop: "auto",
        flexShrink: "0"
      }}
    >
      {/* Gradient separator */}
      <div style={{
        position: "absolute",
        top: "-1px",
        left: "0",
        right: "0",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(233, 69, 96, 0.3), transparent)",
      }}></div>
      
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 mb-3 mb-md-0">
            <Link className="d-flex align-items-center text-decoration-none" to="/">
              <div style={{ 
                background: "#e94560",
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px"
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M15 5L12 2M12 2L9 5M12 2V13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ 
                fontWeight: "700", 
                fontSize: "1.2rem", 
                background: "linear-gradient(90deg, #ffffff, #e0e0e0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.5px"
              }}>
               
              </span>
            </Link>
          </div>
          
          <div className="col-md-4 mb-3 mb-md-0 text-center">
            <p className="mb-0" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}>
              &copy; {new Date().getFullYear()} <strong>InsightLens</strong>. All rights reserved.
            </p>
          </div>
          
          <div className="col-md-4 text-md-end">
            <div className="d-flex justify-content-md-end justify-content-center gap-3">
              {[""].map((item, index) => (
                <Link 
                  key={index}
                  to={`/${item.toLowerCase()}`}
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "color 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#e94560"}
                  onMouseOut={(e) => e.target.style.color = "rgba(255, 255, 255, 0.7)"}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;