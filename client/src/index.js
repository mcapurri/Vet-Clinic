import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwt from 'jsonwebtoken';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from './utils/axios';
import { JSO } from 'jso';

const config = {
    providerID: 'google',
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    ux_mode: 'redirect',
    redirect_uri: process.env.REACT_APP_ORIGIN, // The URL where you is redirected back, and where you perform run the callback() function.
    authorization: 'https://accounts.google.com/o/oauth2/v2/auth',
    token: 'https://oauth2.googleapis.com/token',
    scopes: process.env.REACT_APP_SCOPE,
    default_lifetime: false,
};

let clinicCalendar = new JSO(config);
clinicCalendar.callback();

// const gapi = window.gapi;

// clinicCalendar.setLoader(
//     gapi.auth2.init({
//         client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//     })
// );

// let opts = {
//     response_type: 'id_token token',
// };

// clinicCalendar.getToken(opts).then((token) => {
//     console.log('I got the token: ', token);
// });

const token = localStorage.getItem('token');
jwt.verify(token, process.env.REACT_APP_JWT_SECRET, async (err, decoded) => {
    if (!err) {
        const loggedInUser = await axios.get(
            `/api/auth/loggedin/${decoded._id}`
        );
        // console.log('loggedIn', loggedInUser);
        ReactDOM.render(
            <BrowserRouter>
                <App user={{ ...loggedInUser.data, ...decoded }} />
            </BrowserRouter>,
            document.getElementById('root')
        );
    } else {
        ReactDOM.render(
            <BrowserRouter>
                <App user={''} />
            </BrowserRouter>,
            document.getElementById('root')
        );
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
