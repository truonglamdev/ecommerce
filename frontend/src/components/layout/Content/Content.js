import { Routes, Route } from 'react-router-dom';
import Home from '~/components/Pages/Home';
import Products from '~/components/Pages/Product/Product';
import ProductDetails from '~/components/Pages/Product/ProductDetails';
import Search from '~/components/Pages/Search';
import LoginSignUp from '~/components/User/LoginSignUp';
import Profile from '~/components/User/Profile';
import ProtectedRoute from '~/components/Route/ProtectedRoute';
import UpdateProfile from '~/components/User/UpdateProfile';
import UpdatePassword from '~/components/User/UpdatePassword';
import ForgotPassword from '~/components/User/ForgotPassword';
import ResetPassword from '~/components/User/ResetPassword';
function Content() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route
                path="/account"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/auth/me/update"
                element={
                    <ProtectedRoute>
                        <UpdateProfile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/auth/password/update"
                element={
                    <ProtectedRoute>
                        <UpdatePassword />
                    </ProtectedRoute>
                }
            />

            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
        </Routes>
    );
}

export default Content;
