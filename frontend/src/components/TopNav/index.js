import { Link, NavLink, useLocation } from 'react-router-dom';
import './index.scss';

const TopNav = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/signup' || location.pathname === '/login';

    return (
        <div className='top-nav'>
            <Link to='/' className='logo'>PantryPal</Link>
            <nav>
                {!isAuthPage && <NavLink to='/signup' className='auth-btn'>sign up</NavLink>}
                {!isAuthPage && <NavLink to='/login' className='auth-btn'>log in</NavLink>}
            </nav>
        </div>
    )
}

export default TopNav;