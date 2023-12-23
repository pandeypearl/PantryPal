import React, { useState, useEffect } from 'react';
import './index.scss';

const AuthCreators = () => {
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
        <div className='creator-content'>
            <div>
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
        </div>
    )
}

export default AuthCreators;