import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faUser, faCirclePlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faSquareXTwitter, faFacebook} from '@fortawesome/free-brands-svg-icons';
import './index.scss';

const SideNav = () => {
    // const [showSideNav, setshowSideNav] = useState(false);

    return (
        <div className='side-nav'>
            <span><FontAwesomeIcon icon={faBars} className='nav-icon' /></span>
            <nav>
                <NavLink
                    exact='true'
                    activeClassName='active'
                    to='/'>
                    <FontAwesomeIcon icon={faHouse} className='nav-icon' />
                </NavLink>
                <NavLink
                    exact='true'
                    activeClassName='active'
                    to='/user-profile/:pk'>
                    <FontAwesomeIcon icon={faUser} className='nav-icon' />
                </NavLink>
                <NavLink
                    exact='true'
                    activeClassName='active'
                    to='/'>
                    <FontAwesomeIcon icon={faCirclePlus} className='nav-icon' />
                </NavLink>
                <NavLink
                    exact='true'
                    activeClassName='active'
                    to='/'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='nav-icon' />
                </NavLink>
            </nav>
            <ul>
                <li>
                    <a target='_blank' rel='noreferrer' href='https://www.instagram.com'>
                        <FontAwesomeIcon icon={faInstagram} className='nav-icon' />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel='noreferrer' href='https://www.twitter.com'>
                    <FontAwesomeIcon icon={faSquareXTwitter} className='nav-icon' />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel='noreferrer' href='https://www.facebook.com'>
                        <FontAwesomeIcon icon={faFacebook} className='nav-icon' />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default SideNav;
