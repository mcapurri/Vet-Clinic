import React, { useState } from 'react';
import style from './Login.module.css';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { login } from '../../../utils/auth';

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

    const updateObject = (oldObject, updatedProperties) => {
        return {
            ...oldObject,
            ...updatedProperties,
        };
    };
    const handleChange = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
            }),
        });
        setControls(updatedControls);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        login({
            email: controls.email.value,
            password: controls.password.value,
        }).then((user) => {
            if (user.message) {
                setMessage(user.message);

                //Reset input values
                for (let key in controls) {
                    setControls({ ...controls, key: { ...key, value: '' } });
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
        <Form inline className={style.Form} onSubmit={handleSubmit}>
            <div style={{ display: 'flex' }}>
                <InputGroup>
                    <FormControl
                        placeholder="Email"
                        aria-label="email"
                        aria-describedby="basic-addon1"
                        style={{ marginRight: '2%' }}
                        onChange={handleChange}
                    />
                    <FormControl
                        placeholder="Password"
                        aria-label="password"
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
                        <p
                            style={{
                                color: '#fff ',
                                width: '100%',
                                marginTop: '5%',
                            }}
                        >
                            Haven't you registered yet?
                            <button
                                className={style.Button}
                                onClick={toggleShowForm}
                            >
                                Sign up
                            </button>
                            here
                        </p>
                    </div>
                )}
            </div>
        </Form>
    );
};

export default Login;
