import React, { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './index.scss';

const TopNav = () => {
    const {user, logoutUser} = useContext(AuthContext);
    const location = useLocation();
    const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';

    return (
        <div className='top-nav'>
            <Link to='/' className='logo'>PantryPal</Link>
            {user && <span >{user.username}</span>}
            
            {user ? (
                <span onClick={logoutUser}>Log out</span>
            ): (
                <span>Login</span>
            )}
            <nav>
                {!isAuthPage && <NavLink to='/signup' className='auth-btn'>sign up</NavLink>}
                {!isAuthPage && <NavLink to='/login' className='auth-btn'>log in</NavLink>}
            </nav>
        </div>
    )
}

export default TopNav;