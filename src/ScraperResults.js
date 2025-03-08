import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScraperResults = () => {
    const [dbPapers, setDbPapers] = useState([]);
    const [scrapedPapers, setScrapedPapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/scrape?query=deep learning')
            .then(response => {
                setDbPapers(response.data.dbPapers);  // MongoDB data
                setScrapedPapers(response.data.scrapedPapers);  // Scraped data
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Research Papers</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3 className="text-xl font-semibold mt-4">📚 Papers from Database</h3>
                    <ul className="list-disc pl-5">
                        {dbPapers.map((paper, index) => (
                            <li key={index}>
                                <strong>{paper.title}</strong> - {paper.author}
                            </li>
                        ))}
                    </ul>

                    <h3 className="text-xl font-semibold mt-4">🌐 Newly Scraped Papers</h3>
                    <ul className="list-disc pl-5">
                        {scrapedPapers.map((paper, index) => (
                            <li key={index}>
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                    {paper.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ScraperResults;
