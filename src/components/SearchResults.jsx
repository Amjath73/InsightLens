import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/papers?query=${query}`);;
      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (!data || (!Array.isArray(data.dbPapers) && !Array.isArray(data.scrapedPapers))) {
        console.error("❌ Unexpected API response format:", data);
        return;
      }

      // ✅ Merge `dbPapers` and `scrapedPapers` into a single array
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
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search research papers..."
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="row">
        {results.map((paper, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div
              className="card shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (paper._id) {
                  navigate(`/paper/${paper._id}`);
                } else if (paper.link) {
                  window.open(paper.link, "_blank");
                }
              }}
            >
              <div className="card-body">
                <h5 className="card-title">{paper.title}</h5>
                {paper.authors && <p className="text-muted">By {paper.authors}</p>}
                {paper.snippet && <p>{paper.snippet}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
