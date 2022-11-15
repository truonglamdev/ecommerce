import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
} from '~/constants/productConstants';
import * as request from '~/utils/httpRequest';
//Get all products
const getProducts =
    (keyword = '', currentPage = 1, price = [0, 25000], category = '', ratings=0) =>
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

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export { getProducts, getDetailProduct, clearErrors };
