import { Outlet } from 'react-router-dom';
import SideNav from '../SideNav';
import TopNav from '../TopNav';
import './index.scss';

const Layout = () => {
    return (
        <div className='App'>
            <SideNav />
            <div className='page'>
                <TopNav />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;