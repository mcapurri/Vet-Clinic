import React from 'react';
import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/auth';
import Login from '../Auth/Login/Login';
import { Navbar as Nav } from 'react-bootstrap';

const Navbar = (props) => {
    console.log('isEmployee', props.isEmployee);

    const handleLogout = () =>
        logout()
            .then(() => {
                props.setUser(() => '');
                props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });

    return (
        <Nav className={style.Navbar}>
            {!props.user ? (
                <Login setUser={props.setUser} history={props.history} />
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Link to="/" style={{ marginLeft: '5%' }}>
                        <img
                            src="../../../images/home-logo.png"
                            alt=""
                            style={{ width: '2.5rem' }}
                        />
                    </Link>
                    <ul>
                        <li>
                            <Link to={`/users/${props.user._id}`}>Profile</Link>
                        </li>
                        <li>
                            <button
                                className={style.Button}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            {props.isEmployee ? (
                <ul>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>

                    <li>
                        <Link to="/pets">Patients</Link>
                    </li>
                </ul>
            ) : (
                <ul style={{ display: 'flex', justifySelf: 'center' }}>
                    <li>
                        <Link to="#emergencyForm">Book an appointment</Link>
                    </li>
                </ul>
            )}
        </Nav>
    );
};

export default Navbar;
