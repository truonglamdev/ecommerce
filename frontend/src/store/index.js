import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productReducer, productDetailReducer } from '~/reducers/productReducer';
import { userReducer } from '~/reducers/userReducer';
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailReducer,
    user: userReducer,
});

let initialState = {};

let middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
