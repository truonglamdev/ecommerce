import { Routes, Route } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import Cookies from 'js-cookie';

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
import Cart from '~/components/Cart';
import Shipping from '~/components/Cart/Shipping';
import ConfirmOrder from '~/components/Cart/ConfirmOrder';
// import request from '~/utils/httpRequest';
import Payment from '~/components/Cart/Payment';
import OrderSuccess from '~/components/Cart/OrderSuccess';
import MyOrder from '~/components/Order/MyOrder';
import OrderDetails from '~/components/Order/OrderDetails';
import Dashboard from '~/components/Admin/Dashboard';
import ProductList from '~/components/Admin/ProductList';
import NewProduct from '~/components/Admin/NewProduct';
import UpdateProduct from '~/components/Admin/UpdateProduct';
import OrderList from '~/components/Admin/OrderList';
import EditOrder from '~/components/Admin/EditOrder';
import UserList from '~/components/Admin/UserList';
import EditUser from '~/components/Admin/EditUser';
import ListReview from '~/components/Admin/ListReview';
function Content() {
    // const [stripeApiKey, setStripeApiKey] = useState('');

    // async function getStripeApiKey() {
    //     const token = Cookies.get('token');

    //     const { data } = await request.get('/stripeapikey', {
    //         params: { token: token ? token : '' },
    //     });

    //     setStripeApiKey(data.stripeApiKey);
    // }

    // useEffect(() => {
    //     getStripeApiKey();
    // }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />

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

            <Route
                path="/order/confirm"
                element={
                    <ProtectedRoute>
                        <ConfirmOrder />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/success"
                element={
                    <ProtectedRoute>
                        <OrderSuccess />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <MyOrder />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/order/:id"
                element={
                    <ProtectedRoute>
                        <OrderDetails />
                    </ProtectedRoute>
                }
            />

            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            <Route
                path="/process/payment"
                element={
                    <ProtectedRoute>
                        {/* <Elements stripe={loadStripe(stripeApiKey)} key={stripeApiKey}> */}
                        <Payment />
                        {/* </Elements> */}
                    </ProtectedRoute>
                }
            />

            {/* Admin route */}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/products"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <ProductList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/product"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <NewProduct />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/product/:id"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <UpdateProduct />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/order/:id"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <EditOrder />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/orders"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <OrderList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <UserList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/user/:id"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <EditUser />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/reviews"
                element={
                    <ProtectedRoute isAdmin={true}>
                        <ListReview />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default Content;
