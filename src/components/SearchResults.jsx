import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5000/api/papers?query=${query}`);
    const data = await response.json();
    console.log("API Response:", data); // Debugging

    if (!data || (!Array.isArray(data.dbPapers) && !Array.isArray(data.scrapedPapers))) {
      console.error("❌ Unexpected API response format:", data);
      return;
    }
  
    // ✅ Merge dbPapers and scrapedPapers into a single array
    const combinedResults = [...(data.dbPapers || []), ...(data.scrapedPapers || [])];
  
    setResults(combinedResults);
  };

  return (
    <div className="container">
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
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      <div className="row">
        {results.map((paper) => (
          <div className="col-md-6 mb-3" key={paper._id}>
            <div 
              className="card shadow-sm"
              onClick={() => navigate(`/paper/${paper._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title">{paper.title}</h5>
                <p className="text-muted">By {paper.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
