import AuthContext from '../../context/AuthContext';
import './index.scss';
import React, { useEffect, useState, useContext } from 'react';


const UserProfilePage = () => {
    const [profile, setProfile] = useState([]);
    const {authTokens, logoutUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/user_profiles/', {
            method: 'GET',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': 'Bearer' + String(authTokens.access)
            }
        });
        
        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
            setProfile(data);
        } else if (response.statusText === 'Unauthorized') {
            logoutUser();
        }
        
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (!profile) {
        return <p>Error loading profile data</p>;
    }
    
    return (
        <>
            <h1>User Profile:</h1>
            {profile && (
                <div>
                    <h1>User Profile: </h1>
                    <img src={profile.profile_pic} alt={profile.user.username} />
                    <p>Full Name: {profile.full_name}</p>
                    <p>Username: {profile.user.username}</p>
                    <p>Location: {profile.location}</p>
                    <p>Bio: {profile.bio}</p>
                    <p>Date of Birth: {profile.date_of_birth}</p>
                    <p>Url: {profile.url}</p>
                </div>
            )};
        </>    
        
    )
};

export default UserProfilePage;