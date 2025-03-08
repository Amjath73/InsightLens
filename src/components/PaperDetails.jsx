import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaperDetails = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/papers/${id}`)
      .then((res) => res.json())
      .then((data) => setPaper(data));
  }, [id]);

  if (!paper) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h1 className="card-title">{paper.title}</h1>
        <p className="card-text">{paper.abstract}</p>
        <p className="text-muted">Published by: {paper.author}</p>
      </div>
    </div>
  );
};

export default PaperDetails;
