import React, { useState } from 'react';
import style from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { login, logout } from '../../utils/auth';
import Signup from '../Signup/Signup';
import {
    Navbar as Nav,
    Form,
    InputGroup,
    FormControl,
    Button,
} from 'react-bootstrap';

const Navbar = (props) => {
    console.log('user from Nav', props.user);
    const [showForm, setShowForm] = useState(false);

    const toggleShowForm = () => {
        setShowForm(() => !showForm);
    };

    const handleLogout = (props) => {
        logout().then(() => {
            props.setUser(null);
        });
    };

    return (
        <>
            <Nav
                className={style.Navbar}
                // className="bg-light justify-content-between"
            >
                <Form inline style={{ width: '100%', margin: '5% 0 0 5%' }}>
                    <InputGroup>
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Button type="submit">Log in</Button>
                </Form>
                {/* {message && <p style="color: red">{{ message }}</p>} */}
                <div>
                    <p style={{ color: '#fff ', width: '100%' }}>
                        Haven't you registered yet'?{' '}
                        <button onClick={toggleShowForm}>Sign up</button>
                    </p>
                </div>
            </Nav>
            {showForm && <Signup setUser={props.setUser} />}
        </>
    );
};

export default Navbar;
