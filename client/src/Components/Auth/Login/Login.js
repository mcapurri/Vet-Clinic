import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Login.module.css';
import { Form, FormControl, Button } from 'react-bootstrap';
import { login } from '../../../utils/auth';
import { useForm } from 'react-hook-form';
import useInput from '../../../utils/useInput';

const Login = (props) => {
    const [message, setMessage] = useState('');
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');

    const onSubmit = async (data) => {
        const user = await login({
            email,
            password,
        });
        if (user.message) {
            setMessage(user.message);

            //Reset input values
            setEmail('');
            setPassword('');
        } else {
            if (user.token) {
                localStorage.setItem('token', user.token);
                props.setUser(user.user);
            }
            props.history.push('/');
        }
    };

    return (
        <Form className={style.Form} onSubmit={handleSubmit(onSubmit)}>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    maxWidth: '40rem',
                    justifyContent: 'space-around',
                }}
            >
                <Form.Group>
                    <FormControl
                        {...register('email', {
                            required: true,
                            pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                        })}
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                    />
                    {errors.email && <span>This field is required</span>}
                </Form.Group>

                <Form.Group>
                    <FormControl
                        {...register('password', {
                            required: true,
                            minLength: 3,
                        })}
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={setPassword}
                    />
                    {errors.password && <span>This field is required</span>}
                </Form.Group>
                <Button className={style.LoginButton} type="submit">
                    Log in
                </Button>
            </div>
            <Link to="/forgotpassword">Forgot password?</Link>

            <div style={{ display: 'flex' }}>
                {message ? (
                    <p style={{ color: 'blue', fontSize: '1.2rem' }}>
                        {message}
                    </p>
                ) : (
                    <div style={{ width: '100%' }}>
                        <p>
                            Haven't you registered yet?&nbsp;
                            <Link to={'/signup'} className={style.Link}>
                                Sign up
                            </Link>
                            &nbsp;here
                        </p>
                    </div>
                )}
            </div>
        </Form>
    );
};

export default Login;
