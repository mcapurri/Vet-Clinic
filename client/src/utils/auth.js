import axios from 'axios';

const signup = (
    name,
    lastName,
    street,
    zip,
    city,
    state,
    email,
    password,
    confirm,
    phoneNumber
) => {
    return axios
        .post('/api/auth/signup', {
            name,
            lastName,
            street,
            zip,
            city,
            state,
            email,
            password,
            confirm,
            phoneNumber,
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response.data;
        });
};

const login = (email, password) => {
    return axios
        .post('/api/auth/login', { email, password })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response.data;
        });
};

const logout = () => {
    return axios
        .delete('/api/auth/logout')
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response.data;
        });
};

export { signup, login, logout };
