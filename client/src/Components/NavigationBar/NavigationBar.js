import React, { useRef } from 'react';
import style from './NavigationBar.module.css';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/auth';
import Login from '../Auth/Login/Login';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = (props) => {
    const ref = useRef(null);

    const handleLogout = () =>
        logout()
            .then(() => {
                props.setUser(() => '');
                localStorage.removeItem('token');
                props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });

    return (
        <Container
            className="p-3"
            fluid={true}
            ref={ref}
            style={{ backgroundColor: 'rgb(5, 58, 32)', color: '#fff' }}
        >
            <Navbar
                // collapseOnSelect
                // toggled
                className="border-bottom text-white"
                bg="transparent"
                expand="md"
                ref={ref}
            >
                {!props.user ? (
                    <Login setUser={props.setUser} history={props.history} />
                ) : (
                    <>
                        <Navbar.Brand
                            className="text-white"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            <Link to="/" style={{ marginLeft: '5%' }}>
                                <img
                                    src="/images/home-logo-white.png"
                                    alt=""
                                    style={{ width: '2rem', color: '#fff' }}
                                />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle
                            className="border-0 navbar-dark"
                            aria-controls="navbar-toggle"
                        />
                        <Navbar.Collapse id="navbar-toggle">
                            <Nav
                                className="ml-auto"
                                style={{ textAlign: 'right' }}
                            >
                                <div className={style.navItems}>
                                    {props.isEmployee && (
                                        <>
                                            <div className={style.coupleItems}>
                                                <Link
                                                    className="nav-link text-white"
                                                    to="/users"
                                                >
                                                    Users
                                                </Link>

                                                <Link
                                                    className="nav-link text-white"
                                                    to="/pets"
                                                >
                                                    Patients
                                                </Link>
                                            </div>
                                            <div className={style.coupleItems}>
                                                <Link
                                                    className="nav-link text-white"
                                                    to="/scheduler"
                                                >
                                                    Scheduler
                                                </Link>

                                                <Link
                                                    className="nav-link text-white"
                                                    to="/messages"
                                                >
                                                    Messages
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                    <div className={style.coupleItems}>
                                        <Link
                                            className="nav-link text-white"
                                            to={`/users/${props.user._id}`}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            className={style.Button}
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                )}
            </Navbar>
        </Container>
    );
};

export default NavigationBar;
