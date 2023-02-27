import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, children }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    if (loading === true && !isAuthenticated) {
        return <Navigate to={'/login'} />;
    }
    if (isAdmin === true && user.role !== 'admin') {
        return <Navigate to={'/login'} />;
    }

    return children;
};

export default ProtectedRoute;
