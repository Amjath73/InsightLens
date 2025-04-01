import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import ScraperResults from "./components/ScraperResults";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Getstarted from "./components/Getstarted";
import About from "./components/About";
import Profile from "./components/Profile";
import ProfilePage from "./components/Profile";
import Community from "./components/Community";
import GroupChat from "./components/GroupChat";
import GroupDetail from "./components/GroupDetail";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<SearchResults/>} />
          <Route path="/scraper-results" element={<ScraperResults />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin"element={<SignIn/>}/>
          <Route path="/get"element={<Getstarted/>}/>
          <Route path="/about"element={<About/>}/>
          <Route path="/profile"element={<Profile/>}/>
          <Route path="/community"element={<Community/>}/>
          <Route path="/groupchat"element={<GroupChat/>}/>
          <Route path="/groupchat/:groupId" element={<GroupChat />} />
          <Route path="/community/group/:groupId" element={<GroupDetail />} />
          
          {/* Add more routes as needed */}
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;