import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showSearch, setShowSearch] = useState(true); // Keep search open by default
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
    <div className="container py-4">
      {/* Search Section */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6 text-center">
          {!showSearch ? (
            <button 
              className="btn btn-primary d-flex align-items-center justify-content-center px-4 py-2 mx-auto"
              onClick={() => setShowSearch(true)}
            >
              <FaSearch size={20} className="me-2" />
              Open Search
            </button>
          ) : (
            <div className="bg-white p-4 rounded shadow">
              <input
                type="text"
                className="form-control"
                placeholder="Enter search term..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="mt-3 d-flex justify-content-center">
                <button className="btn btn-success me-2" onClick={handleSearch}>
                  Search
                </button>
                <button className="btn btn-danger" onClick={() => setShowSearch(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="row">
        {results.length > 0 ? (
          results.map((paper, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <motion.div
                className="card shadow-sm border-0 rounded-4 h-100"
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
                  style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                />

                <div className="card-body">
                  <h6 className="card-title text-primary fw-bold">
                    {paper.title.length > 70 ? paper.title.slice(0, 67) + "..." : paper.title}
                  </h6>
                  {paper.authors && <p className="text-muted mb-1 small">By {paper.authors}</p>}
                  {paper.snippet && <p className="text-secondary small">{paper.snippet.slice(0, 150)}...</p>}
                </div>
              </motion.div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted my-4">No results found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;