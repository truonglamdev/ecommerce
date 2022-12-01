import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);

    return loading === false && isAuthenticated ? children : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
