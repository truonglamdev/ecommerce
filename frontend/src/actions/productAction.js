import Cookies from 'js-cookie';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
} from '~/constants/productConstants';
import * as request from '~/utils/httpRequest';
//Get all products
const getProducts =
    (keyword = '', currentPage = 1, price = [0, 25000], category = '', ratings = 0) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCT_REQUEST });
            let option = {
                keyword: keyword,
                page: currentPage,
                'price[gte]': price[0],
                'price[lte]': price[1],
                'ratings[gte]': ratings,
            };
            if (category && category !== 'All') {
                option = { ...option, category };
            }
            const res = await request.get('/products', {
                params: option,
            });
            dispatch({ type: ALL_PRODUCT_SUCCESS, payload: res });
        } catch (error) {
            console.log(error.response.data.message);
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data.message,
            });
        }
    };

//Get details product

const getDetailProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const res = await request.get(`/product/${id}`);
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: res.product });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message,
        });
    }
};

//New review product

const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const token = await Cookies.get('token');

        const res = await request.put(
            '/review',
            reviewData,
            { params: { token: token ? token : '' } },
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        );
        dispatch({ type: NEW_REVIEW_SUCCESS, payload: res.success });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
    }
};
//admin
const adminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });
        const token = Cookies.get('token');
        const res = await request.get('/admin/products', { params: { token: token ? token : '' } });
        dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: res.products });
    } catch (error) {
        dispatch({ type: ADMIN_PRODUCTS_FAIL, payload: error.response.data.message });
    }
};

const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const token = Cookies.get('token');
        const data = await request.remove(`/product/${id}`, { params: { token: token ? token : '' } });
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response.data.message });
    }
};

const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const token = Cookies.get('token');
        const config = {
            headers: { 'Content-Type': 'application/json' },
            params: { token: token ? token : '' },
        };
        const data = await request.post(`/product/new`, productData, config);
        console.log(data);
        dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({ type: NEW_PRODUCT_FAIL, payload: error.response.data.message });
    }
};

const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const token = Cookies.get('token');
        const config = {
            headers: { 'Content-Type': 'application/json' },
            params: { token: token ? token : '' },
        };
        const data = await request.put(`/product/${id}`, productData, config);
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data.message });
    }
};

const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });
        const token = Cookies.get('token');
        const config = {
            headers: { 'Content-Type': 'application/json' },
            params: { token: token ? token : '' },
        };
        const data = await request.remove(`/reviews?id=${reviewId}&productId=${productId}`, config);
        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: error.response.data.message });
    }
};

const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST });
        const res = await request.get(`/reviews?id=${id}`);
        dispatch({ type: ALL_REVIEW_SUCCESS, payload: res.reviews });
    } catch (error) {
        console.log(error.response.data.message);
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

const resetNewProduct = () => (dispatch) => {
    dispatch({ type: NEW_PRODUCT_RESET });
};

const resetDeleted = () => (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_RESET });
};

const resetReview = () => async (dispatch) => {
    dispatch({ type: NEW_REVIEW_RESET });
};

const resetUpdate = () => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_RESET });
};

const resetDeleteReview = () => async (dispatch) => {
    dispatch({ type: DELETE_REVIEW_RESET });
};

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export {
    getProducts,
    resetUpdate,
    getDetailProduct,
    clearErrors,
    newReview,
    resetReview,
    adminProducts,
    deleteProduct,
    resetDeleted,
    newProduct,
    resetNewProduct,
    updateProduct,
    deleteReview,
    getAllReviews,
    resetDeleteReview,
};
