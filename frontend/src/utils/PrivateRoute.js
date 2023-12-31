import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ isAuthenticated, children }) => {
    const user = useContext(AuthContext)
    return user ? <Outlet>{children}</Outlet> : <Navigate to='/login' />;
};

export default PrivateRoute;
