import Cookies from 'js-cookie';
import {
    ALL_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
} from '~/constants/orderConstant';
import request from '~/utils/httpRequest';

const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const token = Cookies.get('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: { token: token ? token : '' },
        };

        const res = await request.post(`/order/new`, order, config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
        console.log(error.response.data.message);
    }
};

const myOrders = () => async (dispatch) => {
    try {
        const token = Cookies.get('token');
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await request.get('/orders/me', { params: { token: token ? token : '' } });

        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
        console.log(error.response.data.message);
    }
};

const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const token = Cookies.get('token');
        const { data } = await request.get(`/order/${id}`, { params: { token: token ? token : '' } });

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message });
    }
};

//Get all orders [admin]
const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });
        const token = Cookies.get('token');
        const {data} = await request.get('/admin/orders', { params: { token: token ? token : '' } });
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });
    }
};

// Clearing Errors
const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export { createOrder, clearErrors, myOrders, getOrderDetails, getAllOrders };
