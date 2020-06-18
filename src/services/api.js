import axios from 'axios';
import { getData } from '../util/async-storage'
const api = axios.create({
    baseURL: 'https://4d746e82cddb.ngrok.io/api'
});

api.interceptors.request.use(async (config) => {
    const userToken = await getData('access_token');
    config.headers.Authorization = `Bearer ${userToken}`;
    return config;
});

const onResponseSuccess = response => {
    return response;
};

const onResponseFail = error => {
    const status = error.status || error.response.status;
    return Promise.reject(error);
};

api.interceptors.response.use(onResponseSuccess, onResponseFail);

export default api;