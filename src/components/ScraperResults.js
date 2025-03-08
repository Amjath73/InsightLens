import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScraperResults = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/scrape?query=deep%20learning')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Scraped Research Links</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="list-disc pl-5">
                    {data.map((item, index) => (
                        <li key={index}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ScraperResults;
