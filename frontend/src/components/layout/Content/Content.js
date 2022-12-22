import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';

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
import request from '~/utils/httpRequest';
import Payment from '~/components/Cart/Payment';
import OrderSuccess from '~/components/Cart/OrderSuccess';
import MyOrder from '~/components/Order/MyOrder';
import OrderDetail from '~/components/Order/OrderDetail';
function Content() {
    const [stripeApiKey, setStripeApiKey] = useState('');

    async function getStripeApiKey() {
        const token = Cookies.get('token');

        const { data } = await request.get('/stripeapikey', {
            params: { token: token ? token : '' },
        });

        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        getStripeApiKey();
    }, []);

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
                        <OrderDetail />
                    </ProtectedRoute>
                }
            />

            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            {stripeApiKey && (
                <Route
                    path="/process/payment"
                    element={
                        <ProtectedRoute>
                            <Elements stripe={loadStripe(stripeApiKey)} key={stripeApiKey}>
                                <Payment />
                            </Elements>
                        </ProtectedRoute>
                    }
                />
            )}
        </Routes>
    );
}

export default Content;
