import axios from 'axios';
const token = localStorage.getItem('token');
const instance = axios.create({
    baseUrl: `${process.env.REACT_APP_ORIGIN}`,
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

if (token) {
    //applying token

    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    //deleting the token from header

    delete instance.defaults.headers.common['Authorization'];
}

// instance.interceptors.request.use(
//     (req) => {
//         if (axios.defaults.headers.common['Authorization']) return req;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axios.interceptors.request.use(
//     (config) => {
//         const { origin } = new URL(config.url);
//         const allowedOrigins = [`${process.env.REACT_APP_ORIGIN}`];
//         const token = localStorage.getItem('token');
//         if (allowedOrigins.includes(origin)) {
//             config.headers.authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// //on successful response
// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const fallbackValue = [
//             {
//                 userId: 'Not authorized to access this route',
//                 // id: 'aerw15311sq',
//                 title: 'Please try again',
//                 completed: false,
//             },
//         ];
//         return Promise.reject(fallbackValue);
//     }
// );

export default instance;
