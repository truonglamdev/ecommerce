import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, options = {}, config = {}) => {
    const response = await request.post(path, options, config);
    return response.data;
};

export const put = async (path, options = {}, config = {}) => {
    const response = await request.put(path, options, config);
    return response.data;
};

export default request;
