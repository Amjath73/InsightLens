import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/" style={{ color: "#f8f9fa", letterSpacing: "1px" }}>
          InsightLens
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light mx-2 fs-5" to="/about" style={{ transition: "0.3s" }}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
