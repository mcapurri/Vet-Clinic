import axios from 'axios';

const signup = (
    name,
    lastName,
    email,
    password,
    confirm,
    street,
    zipCode,
    city,
    state,
    phoneNumber
) => {
    return axios
        .post('/api/auth/signup', {
            name,
            lastName,
            email,
            password,
            confirm,
            street,
            zipCode,
            city,
            state,
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
