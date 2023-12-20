import React, { useState, useEffect } from 'react';
import './index.scss';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('/');
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
        };

        fetchData();
    }, []); 

    return (
        <div>
            <h1>Welcome to the Landing Page</h1>
            <p>This is the landing page content.</p>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                    
                ))}
                </ul>
            )}
        </div>
    )
}

export default Home;