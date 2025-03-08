import React from "react";

const Footer = () => {
  return (
    <footer 
      className="text-white text-center py-3 mt-5"
      style={{ background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)", position: "relative", bottom: "0", width: "100%" }}
    >
      <p className="mb-0">
        &copy; {new Date().getFullYear()} <strong>InsightLens</strong>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
