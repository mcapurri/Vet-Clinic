import React, { useState } from 'react';
import style from './Login.module.css';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { login, logout } from '../../../utils/auth';

const Login = (props) => {
    const [message, setMessage] = useState('');
    const [controls, setControls] = useState({
        email: {
            type: 'email',
            placeholder: 'Email',
            value: '',
            validation: {
                required: true,
            },
        },
        password: {
            type: 'password',
            placeholder: 'Password',
            value: '',
            validation: {
                required: true,
            },
        },
    });

    const toggleShowForm = () => {
        props.setShowForm(() => !props.showForm);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setControls({
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = controls;

        login(email, password).then((user) => {
            if (user.message) {
                setMessage(user.message);

                for (let key in controls) {
                    setControls({
                        key: { ...key, value: '' },
                    });
                }
            } else {
                // the response from the server is a user object -> signup was successful
                // we want to put the user object in the state of App.js
                console.log(user);
                props.setUser(user);
                props.history.push('/');
            }
        });
    };
    return (
        <Form
            inline
            style={{
                width: '100%',
                margin: '5% 0 0 5%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
            }}
            onClick={handleSubmit}
        >
            <div>
                <InputGroup>
                    <FormControl
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        style={{ marginRight: '2%' }}
                        onChange={handleChange}
                    />
                    <FormControl
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        style={{ marginRight: '2%' }}
                        onChange={handleChange}
                    />
                </InputGroup>
                <Button type="submit">Log in</Button>
            </div>
            <div>
                {message ? (
                    <p style={{ color: 'red' }}>{{ message }}</p>
                ) : (
                    <div>
                        <p style={{ color: '#fff ', width: '100%' }}>
                            Haven't you registered yet'?{' '}
                            <button
                                className={style.Button}
                                onClick={toggleShowForm}
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </Form>
    );
};

export default Login;
