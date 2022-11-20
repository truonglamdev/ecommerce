import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
} from '~/constants/userConstants';
import * as request from '~/utils/httpRequest';

const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const res = await request.post(
            '/login',
            { email, password },
            { headers: { 'Content-Type': 'application/json' } },
        );
        dispatch({ type: LOGIN_SUCCESS, payload: res.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

//register
const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_SUCCESS });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const res = await request.post('/auth/register', userData, config);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: res.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
};

//load user

const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const res = await request.get('/auth/me');
        dispatch({ type: LOAD_USER_SUCCESS, payload: res.user });
    } catch (error) {
        console.log(error);
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};


// Clearing Errors
const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
export { login, clearErrors, register, loadUser };
