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
                    backgroundImage: `url('https://img.freepik.com/free-vector/vintage-science-education-background_23-2148483429.jpg?t=st=1741623567~exp=1741627167~hmac=930fcace8391d825b1f442f0c8cc38f4881afbaa527e3f8bb0142d8c9e5c4195&w=1380')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "15px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                
                {/* Title Text */}
                <h1
                    style={{
                        position: "absolute",
                        color: "#0D3B66", // Dark Blue
                        fontSize: "2rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        textShadow: "2px 2px 5px rgba(255,255,255,0.7)", // White glow for contrast
                    }}
                >
                    InsightLens: Research Trend Analyser
                </h1>
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
