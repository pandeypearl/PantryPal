import { Link, NavLink } from 'react-router-dom';
import './index.scss';

const TopNav = () => {
    return (
        <div>
            <Link to='/' className='logo'>PantryPal</Link>
            <nav>
                <NavLink to='/signup'>sign up</NavLink>
                <NavLink to='/login'>log in</NavLink>
            </nav>
        </div>
    )
}

export default TopNav;