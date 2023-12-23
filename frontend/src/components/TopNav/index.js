import { Link, NavLink } from 'react-router-dom';
import './index.scss';

const TopNav = () => {
    return (
        <div className='top-nav'>
            <Link to='/' className='logo'>PantryPal</Link>
            <nav>
                <NavLink to='/signup' className='auth-btn'>sign up</NavLink>
                <NavLink to='/login' className='auth-btn'>log in</NavLink>
            </nav>
        </div>
    )
}

export default TopNav;