import api from './api';

export const confirm = async (formdata) => {
    try {
        const res = await api.post('/fretes/calcular', formdata);

        console.log(formdata)

        return {res: res['data']}
    } catch (err) {
        return {err: err['response']}
    }
}

export const schedule = async (email, password) => {
    try {
        const res = await api.post('/auth/login', {
            email,
            password
        });

        return {res: res['data']}
    } catch (err) {
        return {err: err['response']}
    }
}