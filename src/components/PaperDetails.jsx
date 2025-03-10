import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaperDetails = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/papers`)
      .then((res) => res.json())
      .then((data) => {
        if (data.scrapedPapers) {
          const foundPaper = data.scrapedPapers.find((p) => p.id === id);
          if (foundPaper) {
            setPaper(foundPaper);
          } else {
            setError("Paper not found.");
          }
        } else {
          setError("No papers available.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching paper:", err);
        setError("Failed to fetch paper.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-center mt-5">{error}</h2>;

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h1 className="card-title">{paper.title}</h1>
        <p className="card-text">{paper.abstract || "No abstract available."}</p>
        <p className="text-muted">
          <strong>Published by:</strong> {paper.authors || "Unknown"}
        </p>
        <p className="text-muted">
          <strong>Year:</strong> {paper.year || "N/A"}
        </p>
        <a
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-3"
        >
          Read Full Paper
        </a>
      </div>
    </div>
  );
};

export default PaperDetails;
