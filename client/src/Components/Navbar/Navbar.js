import React from 'react';
import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/auth';
import Login from '../Auth/Login/Login';
import { Navbar as Nav } from 'react-bootstrap';

const Navbar = (props) => {
    console.log('props from Nav', props);
    console.log('user from Nav', props.user);

    const handleLogout = (props) => {
        logout().then(() => {
            props.setUser(null);
        });
    };

    return (
        <Nav className={style.Navbar}>
            <Login />
        </Nav>
    );
};

export default Navbar;
