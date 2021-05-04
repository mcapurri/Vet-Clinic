import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import jwt from 'jsonwebtoken';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { JWT_SECRET } from './utils/config.json';

const token = localStorage.getItem('token');

jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (!err) {
        const loggedInUser = await axios.get(
            `/api/auth/loggedin/${decoded._id}`
        );

        // console.log('loggeIn', loggedInUser);

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
