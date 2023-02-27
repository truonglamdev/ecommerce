import Cookies from 'js-cookie';
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
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
} from '~/constants/userConstants';
import * as request from '~/utils/httpRequest';

const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const res = await request.post(
            '/login',
            { email, password },
            {
                headers: { 'Content-Type': 'application/json' },
            },
        );

        if (res && res.token) {
            Cookies.set('token', res.token, {
                httpOnly: false,
                secure: false,
            });
        }

        dispatch({ type: LOGIN_SUCCESS, payload: res.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

//register
const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_SUCCESS });

        const res = await request.post('/auth/register', userData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        dispatch({ type: REGISTER_USER_SUCCESS, payload: res.user });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
};

//load user

const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const token = Cookies.get('token');

        const res = await request.get('/auth/me', {
            params: { token: token ? token : '' },
        });
        dispatch({ type: LOAD_USER_SUCCESS, payload: res.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};

//logout

const logout = () => async (dispatch) => {
    try {
        await request.post('/auth/logout');
        await Cookies.remove('token');
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

//update profile
const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const token = await Cookies.get('token');
        const res = await request.put(
            '/auth/me/update',
            userData,
            { params: { token: token ? token : '' } },
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        );
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.success });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
    }
};

//update password
const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const token = await Cookies.get('token');
        const res = await request.put(
            '/auth/password/update',
            passwords,
            { params: { token: token ? token : '' } },
            {
                headers: { 'Content-Type': 'application/json' },
            },
        );
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: res.success });
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
    }
};

//forgot password
const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const res = await request.post('/password/forgot', email, config);
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: res.message });
    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
    }
};

//reset password
const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const res = await request.put(`/password/reset/${token}`, passwords, '', config);
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.success });
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
    }
};

//get all users [admin]
const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const token = await Cookies.get('token');
        const res = await request.get('/auth/admin/users', { params: { token: token ? token : '' } });
        dispatch({ type: ALL_USERS_SUCCESS, payload: res.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};

// Clearing Errors
const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

const updateProfileReset = () => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_RESET });
};
const updatePasswordReset = () => async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_RESET });
};
export {
    login,
    clearErrors,
    register,
    loadUser,
    logout,
    updateProfile,
    updateProfileReset,
    updatePassword,
    updatePasswordReset,
    forgotPassword,
    resetPassword,
    getAllUsers,
};
