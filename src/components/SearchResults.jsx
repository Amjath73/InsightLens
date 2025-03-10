import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/papers?query=${query}`);
      const data = await response.json();
      console.log("API Response:", data);

      if (!data || (!Array.isArray(data.dbPapers) && !Array.isArray(data.scrapedPapers))) {
        console.error("❌ Unexpected API response format:", data);
        return;
      }

      const combinedResults = [...(data.dbPapers || []), ...(data.scrapedPapers || [])];
      setResults(combinedResults);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-4">
      
      {/* Search Bar */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control rounded-pill px-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search research papers..."
            />
            <button className="btn btn-primary rounded-pill px-4" onClick={handleSearch}>
              🔍 Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="row g-4"> {/* Added gap for spacing */}
        {results.map((paper, index) => (
          <div className="col-md-6 col-lg-6 mb-4" key={index}> {/* 2 in a row */}
            <motion.div
              className="card shadow-lg border-0 rounded-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{ cursor: "pointer", overflow: "hidden" }}
              onClick={() => {
                if (paper._id) {
                  navigate(`/paper/${paper._id}`);
                } else if (paper.link) {
                  window.open(paper.link, "_blank");
                }
              }}
            >
              
              {/* Card Image */}
              <img
                src="https://c4.wallpaperflare.com/wallpaper/661/386/473/antique-book-glasses-learning-wallpaper-preview.jpg"
                alt="Paper Preview"
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">{paper.title}</h5>
                {paper.authors && <p className="text-muted mb-1">By {paper.authors}</p>}
                {paper.snippet && <p className="text-secondary small">{paper.snippet}</p>}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
