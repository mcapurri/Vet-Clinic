import React, { useState } from 'react';
import style from './ResetPassword.module.css';
import { Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useInput from '../../../utils/useInput';
import axios from 'axios';
import { useForm } from 'react-hook-form';
// import { RiArrowGoBackLine as BackArrow } from 'react-icons/ri';

const ResetPassword = (props) => {
    const [message, setMessage] = useState('');

    const [password, setPassword] = useInput('');
    const [confirm, setConfirm] = useInput('');
    const [token] = useState(props.match.params.resettoken);
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`/api/auth/resetpassword/${token}`, { password, confirm })
            .then((res) => {
                console.log('response', res.data.message);
                setMessage(res.data.message);
                props.history.push('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={style.Container}>
            <Form className={style.Form} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <label htmlFor="password">Password</label>
                    <FormControl
                        {...register('password', { required: true })}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={setPassword}
                    />
                </Form.Group>
                <Form.Group>
                    <label htmlFor="confirm">Confirm Password</label>
                    <FormControl
                        {...register('confirm', { required: true })}
                        name="confirm"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirm}
                        onChange={setConfirm}
                    />
                </Form.Group>
                <p style={{ color: '#fff', fontSize: '1rem' }}>{message}</p>
                <Button type="submit">Reset Password</Button>
            </Form>

            <Link to="/">
                {' '}
                {/* <BackArrow style={{ fontSize: '2rem' }} /> */}
                Back
            </Link>
        </div>
    );
};

export default ResetPassword;
