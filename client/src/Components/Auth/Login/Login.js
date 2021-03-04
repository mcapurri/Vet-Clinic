import React, { useState } from 'react';
import style from './Login.module.css';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { login, logout } from '../../../utils/auth';
import Signup from '../Signup/Signup';

const Login = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');

    const toggleShowForm = () => {
        setShowForm(() => !showForm);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        login(username, password).then((user) => {
            if (user.message) {
                this.setState({
                    message: user.message,
                    username: '',
                    password: '',
                });
            } else {
                // the response from the server is a user object -> signup was successful
                // we want to put the user object in the state of App.js
                console.log(user);
                this.props.setUser(user);
                this.props.history.push('/projects');
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
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{ marginRight: '2%' }}
                    />
                    <FormControl
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        style={{ marginRight: '2%' }}
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
            {showForm && <Signup setUser={props.setUser} />}
        </Form>
    );
};

export default Login;
