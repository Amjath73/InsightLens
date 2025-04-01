import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background: scrolled 
          ? "#1a1a2e" 
          : "rgba(26, 26, 46, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
        transition: "all 0.3s ease",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div style={{ 
            background: "#e94560",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M15 5L12 2M12 2L9 5M12 2V13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ 
            fontWeight: "700", 
            fontSize: "1.4rem", 
            background: "linear-gradient(90deg, #ffffff, #e0e0e0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.5px"
          }}>
            InsightLens
          </span>
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{ color: "#ffffff" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {["Home", "About", ""].map((item, index) => (
              <li className="nav-item" key={index}>
                <Link 
                  className="nav-link mx-2" 
                  to={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
                  style={{
                    color: "#ffffff",
                    fontWeight: "500",
                    position: "relative",
                    padding: "8px 12px",
                    opacity: 0.85,
                    transition: "all 0.3s ease"
                  }}
                >
                  {item}
                  <span style={{
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    width: "0",
                    height: "2px",
                    background: "#e94560",
                    transform: "translateX(-50%)",
                    transition: "width 0.3s ease",
                    borderRadius: "2px"
                  }} className="hover-indicator" />
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="d-flex gap-2">
            
          </div>
        </div>
      </div>
      
      {/* Add a subtle gradient separator */}
      <div style={{
        position: "absolute",
        bottom: "-1px",
        left: "0",
        right: "0",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(233, 69, 96, 0.3), transparent)",
      }}></div>
    </motion.nav>
  );
};

export default Navbar;