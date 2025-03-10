import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Getstarted = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Smaller Background Image Container */}
      <div
        style={{
          width: "80vw",
          height: "50vh",
          backgroundImage: `url('https://c1.wallpaperflare.com/preview/610/587/681/book-book-pages-browse-education.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "15px",
          position: "relative",
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: "15px",
          }}
        ></div>
      </div>

      {/* Buttons Container (Below the Image) */}
      <motion.div
        className="text-center p-3 rounded shadow-lg mt-3"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "15px",
          zIndex: 1,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <button
          className="btn btn-primary m-2 px-3"
          onClick={() => navigate("/signin")}
        >
          Sign In
        </button>
        <button
          className="btn btn-outline-dark m-2 px-3"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </motion.div>
    </div>
  );
};

export default Getstarted;
