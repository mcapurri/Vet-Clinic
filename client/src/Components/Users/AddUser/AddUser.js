import React, { useState } from 'react';
import style from './AddUser.module.css';
import useInput from '../../../utils/useInput';
import { Form, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddUser = (props) => {
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();
    const [message, setMessage] = useState('');
    const [firstName, setFirstName] = useInput('');
    const [lastName, setLastName] = useInput('');
    const [email, setEmail] = useInput('');
    const [phoneNumber, setPhoneNumber] = useInput('');
    const [street, setStreet] = useInput('');
    const [zipCode, setZipCode] = useInput('');
    const [city, setCity] = useInput('');
    const [role, setRole] = useInput('');

    const token = localStorage.getItem('token');

    const onSubmit = async (data) => {
        console.log('data', data);
        const user = await axios.post('/api/users/add', data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (user.msg) {
            setMessage(user.msg);

            // Reset input values
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setStreet('');
            setZipCode('');
            setCity('');
        } else {
            console.log('user added', user);
            props.history.goBack();
        }
    };
    return (
        <Form className={style.Form} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <FormControl
                    {...register('firstName', {
                        required: true,
                        minLength: 2,
                    })}
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
                    {...register('lastName', {
                        required: true,
                        minLength: 2,
                    })}
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

            <Form.Group>
                <FormControl
                    as="select"
                    {...register('role', { required: true })}
                    name="role"
                    value={role}
                    onChange={setRole}
                    id={style.Select}
                >
                    <option value="">--Choose one--</option>
                    <option value="employee">Employee</option>
                    <option value="client">Client</option>
                </FormControl>
                {errors.role && <span>This field is required</span>}
            </Form.Group>

            {message && <p style={{ color: 'red' }}>{message}</p>}

            <button className={style.Button} type="submit">
                <h1 style={{ fontWeight: 'bold' }}>+</h1>
            </button>
            <button onClick={() => props.history.goBack()}>Back</button>
        </Form>
    );
};

export default AddUser;
