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
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Link to="/" style={{ marginLeft: '5%' }}>
                        <img
                            src="../../../images/home-logo.png"
                            alt=""
                            style={{ width: '4rem' }}
                        />
                    </Link>
                    {props.isEmployee && (
                        <ul>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>

                            <li>
                                <Link to="/pets">Patients</Link>
                            </li>
                            <li>
                                <Link to="/contacts">
                                    Appointments & Requests
                                </Link>
                            </li>
                        </ul>
                    )}

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
        </Nav>
    );
};

export default Navbar;
