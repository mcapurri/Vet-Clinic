import React, { useState } from 'react';
import style from './Signup.module.css';
import { signup } from '../../../utils/auth';
import { Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useInput from '../../../utils/useInput';

const Signup = (props) => {
    const [message, setMessage] = useState('');
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    const [firstName, setFirstName] = useInput('');
    const [lastName, setLastName] = useInput('');
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');
    const [confirm, setConfirm] = useInput('');
    const [phoneNumber, setPhoneNumber] = useInput('');
    const [street, setStreet] = useInput('');
    const [zipCode, setZipCode] = useInput('');
    const [city, setCity] = useInput('');

    console.log('city', city);
    const onSubmit = async (data) => {
        console.log('data', data);
        // event.preventDefault();
        const user = await signup(data);
        if (user.message) {
            setMessage(user.message);
        } else {
            // signup was successful
            props.setUser(user);
            props.history.push('/');
        }
    };

    return (
        <Form className={style.Form} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <FormControl
                    {...register('firstName', { required: true, minLength: 2 })}
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={setFirstName}
                />
                {errors.firstName && <span>This field is required</span>}
            </Form.Group>

            <Form.Group>
                <FormControl
                    {...register('lastName', { required: true, minLength: 2 })}
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={setLastName}
                />
                {errors.lastName && <span>This field is required</span>}
            </Form.Group>

            <Form.Group>
                <FormControl
                    {...register('email', { required: true })}
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
                    {...register('password', { required: true, minLength: 3 })}
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                />
                {errors.password && <span>This field is required</span>}
            </Form.Group>

            <Form.Group>
                <FormControl
                    {...register('confirm', { required: true, minLength: 3 })}
                    placeholder="Confirm password"
                    name="confirm"
                    type="password"
                    value={confirm}
                    onChange={setConfirm}
                />
                {errors.confirm && <span>This field is required</span>}
            </Form.Group>

            <Form.Group>
                <FormControl
                    {...register('phoneNumber', { required: true })}
                    placeholder="Phone Number"
                    name="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                />
                {errors.phoneNumber && <span>This field is required</span>}
            </Form.Group>

            <Form.Group>
                <FormControl
                    {...register('street', { required: true })}
                    placeholder="Street"
                    name="street"
                    type="text"
                    value={street}
                    onChange={setStreet}
                />
                {errors.street && <span>This field is required</span>}
            </Form.Group>

            <Form.Group>
                <FormControl
                    {...register('zipCode', {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    })}
                    placeholder="Zip Code"
                    name="zipCode"
                    type="text"
                    value={zipCode}
                    onChange={setZipCode}
                />
                {errors.zipCode && <span>This field is required</span>}
            </Form.Group>

            <Form.Group>
                <FormControl
                    {...register('city', { required: true, minLength: 2 })}
                    placeholder="City"
                    name="city"
                    type="text"
                    value={city}
                    onChange={setCity}
                />
                {errors.city && <span>This field is required</span>}
            </Form.Group>

            <button
                className={style.Button}
                type="submit"
                // disabled={!formIsValid}
            >
                Sign up
            </button>
            {message && <p style={{ color: 'red', padding: '0' }}>{message}</p>}

            <Link to="/">Back</Link>
        </Form>
    );
};

export default Signup;
