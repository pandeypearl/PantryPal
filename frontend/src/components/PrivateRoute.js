import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? <Outlet>{children}</Outlet> : <Navigate to='/login' />;
};

export default PrivateRoute;