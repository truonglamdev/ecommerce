import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    productReducer,
    productDetailReducer,
    newReviewReducer,
    adminProductReducer,
    deleteProductReducer,
    newProductReducer,
    updateProductReducer,
    reviewReducer,
    productReviewReducer,
} from '~/reducers/productReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userAdminReducer, userDetailsReducer, userReducer } from '~/reducers/userReducer';
import { cartReducer } from '~/reducers/cartReducer';
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from '~/reducers/orderReducer';
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailReducer,
    newReview: newReviewReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    //admin
    adminUsers: allUsersReducer,
    adminProducts: adminProductReducer,
    deleteProduct: deleteProductReducer,
    newProduct: newProductReducer,
    updateProduct: updateProductReducer,

    order: orderReducer,
    adminOrders: allOrdersReducer,

    userAdmin : userAdminReducer,
    userDetails : userDetailsReducer,
    productReviews : productReviewReducer,
    review : reviewReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    },
};

let middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
