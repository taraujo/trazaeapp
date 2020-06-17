import axios from 'axios';
import {AsyncStorage} from 'react-native'
const api = axios.create({
    baseURL: 'https://af2aa2d75cd4.ngrok.io/api'
});

api.interceptors.request.use(async (config) => {
    const userToken = AsyncStorage.getItem('access_token');
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