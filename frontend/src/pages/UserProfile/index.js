import './index.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const UserProfilePage = () => {
    const { pk } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/user_profile/${pk}/`, {
                    credentials: 'include',  // Include credentials (e.g., cookies) in the request
                });

                if (response.status === 401) {
                    // Handle unauthorized access (user not logged in)
                    console.log('User not logged in');
                    return;
                }

                const data = await response.json();
                console.log(data);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchData();
    }, [pk]);

    if (!userData) {
        return <p>Loading...</p>;
    }

    const {
        user_object,
        user_profile,
        followers,
        following,
        is_following,
        follower_count,
        following_count,
    } = userData;

    return (
        <div>
            <h1>User Profile: </h1>
            {/* Render other user profile information as needed */}
            <p>Followers: {follower_count}</p>
            <p>Following: {following_count}</p>
            {/* Render other user-related data as needed */}
        </div>
    )
};

export default UserProfilePage;