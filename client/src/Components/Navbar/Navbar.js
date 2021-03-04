import React, { useState } from 'react';
import style from './Navbar.module.css';
// import { Link } from 'react-router-dom';
// import { logout } from '../../utils/auth';
import Login from '../Auth/Login/Login';
import Signup from '../Auth/Signup/Signup';
import { Navbar as Nav } from 'react-bootstrap';

const Navbar = (props) => {
    const [showForm, setShowForm] = useState(false);

    console.log('user from Nav', props.user);

    // const handleLogout = (props) => {
    //     logout().then(() => {
    //         props.setUser(null);
    //     });
    // };

    return (
        <>
            <Nav className={style.Navbar}>
                <Login
                    showForm={showForm}
                    setShowForm={setShowForm}
                    setUser={props.setUser}
                    history={props.history}
                />
            </Nav>
            {showForm && (
                <Signup
                    setUser={props.setUser}
                    showForm={showForm}
                    setShowForm={setShowForm}
                    history={props.history}
                />
            )}
        </>
    );
};

export default Navbar;
