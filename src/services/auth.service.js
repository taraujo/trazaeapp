import api from './api';

export const signIn = async (email, password) => {
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