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
            <span><FontAwesomeIcon icon={faBars} /></span>
            <nav>
                <NavLink
                    exact='true'
                    activeClassName='active'
                    to='/'>
                    <FontAwesomeIcon icon={faHouse} />
                </NavLink>
                <NavLink
                    exact='true'
                    activeClassName='active'
                    to='/'>
                    <FontAwesomeIcon icon={faUser} />
                </NavLink>
                <NavLink
                    exact='true'
                    activeClassName='active'
                    to='/'>
                    <FontAwesomeIcon icon={faCirclePlus} />
                </NavLink>
                <NavLink
                    exact='true'
                    activeClassName='active'
                    to='/'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </NavLink>
            </nav>
            <ul>
                <li>
                    <a target='_blank' rel='noreferrer' href='https://www.instagram.com'>
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel='noreferrer' href='https://www.twitter.com'>
                    <FontAwesomeIcon icon={faSquareXTwitter} />
                    </a>
                </li>
                <li>
                    <a target='_blank' rel='noreferrer' href='https://www.facebook.com'>
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default SideNav;
