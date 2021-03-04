import React, { useState } from 'react';
import style from './Signup.module.css';
import { signup } from '../../../utils/auth';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Signup = (props) => {
    const [message, setMessage] = useState('');
    const [controls, setControls] = useState({
        name: {
            type: 'text',
            placeholder: 'Name',
            value: '',
            validation: {
                required: true,
            },
        },
        lastName: {
            type: 'text',
            placeholder: 'Last name',
            value: '',
            validation: {
                required: true,
            },
        },
        email: {
            type: 'email',
            placeholder: 'First brewed',
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
        confirm: {
            type: 'password',
            placeholder: 'Confirm password',
            value: '',
            validation: {
                required: true,
            },
        },
        street: {
            type: 'text',
            placeholder: 'Street',
            value: '',
            validation: {
                required: false,
            },
        },
        zipCode: {
            type: 'text',
            placeholder: 'ZIP Code',
            value: '',
            validation: {
                required: false,
            },
        },
        city: {
            type: 'text',
            placeholder: 'City',
            value: '',
            validation: {
                required: false,
            },
        },
        state: {
            type: 'text',
            placeholder: 'State',
            value: '',
            validation: {
                required: false,
            },
        },
        phoneNumber: {
            type: 'text',
            placeholder: 'Phone Num.',
            value: '',
            validation: {
                required: false,
            },
        },
    });

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
    // console.log('ControlsUpdated', controls);

    const handleSubmit = (event) => {
        event.preventDefault();
        const {
            name,
            lastName,
            email,
            password,
            confirm,
            street,
            zipCode,
            city,
            state,
            phoneNumber,
        } = controls;

        console.log('password', password);
        console.log('confirm', confirm);

        signup(
            name,
            lastName,
            email,
            password,
            confirm,
            street,
            zipCode,
            city,
            state,
            phoneNumber
        ).then((user) => {
            if (user.message) {
                setMessage(user.message);

                // Reset input values
                for (let key in controls) {
                    setControls({
                        key: { ...key, value: '' },
                    });
                }
            } else {
                // the response from the server is a user object -> signup was successful
                // we want to put the user object in the state of App.js
                console.log('user from Signup', user);
                console.log('props Signup', props);
                props.setShowForm(() => !props.showForm);
                props.setUser(user);
                props.history.push('/');
            }
        });
    };

    // Make dynamic input tags for the form
    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        });
    }
    let form = formElementsArray.map((formElement) => {
        return (
            <div className="form-group" key={formElement.id}>
                <input
                    className="form-control"
                    type={formElement.config.type}
                    value={formElement.config.value}
                    placeholder={formElement.config.placeholder}
                    onChange={(event) => handleChange(event, formElement.id)}
                />
            </div>
        );
    });

    return (
        <Form className={style.Form} onSubmit={handleSubmit}>
            {form}
            <button className={style.Button} type="submit">
                Sign up
            </button>
            {message && <p style={{ color: 'red' }}>{message}</p>}

            <p>
                Do you already have an account? <Link to="/">Login</Link>
            </p>
        </Form>
    );
};

export default Signup;
