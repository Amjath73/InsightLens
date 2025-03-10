import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import PaperDetails from "./components/PaperDetails";
import Footer from "./components/Footer";
import ScraperResults from "./components/ScraperResults";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Getstarted from "./components/Getstarted";
import About from "./components/About";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold"></h1>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<SearchResults/>} />
          <Route path="/paper/:id" element={<PaperDetails />} />
          <Route path="/scraper-results" element={<ScraperResults />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin"element={<SignIn/>}/>
          <Route path="/get"element={<Getstarted/>}/>
          <Route path="/about"element={<About/>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;