import axios from 'axios';

const signup = (userCredentials) => {
    return axios
        .post('/api/auth/signup', userCredentials)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response.data;
        });
};

const login = (userCredentials) => {
    return axios
        .post('/api/auth/login', userCredentials)
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
