import React, { useState } from 'react';
import style from './Signup.module.css';
import { signup } from '../../utils/auth';

const Signup = () => {
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
            placeholder: 'Last Name',
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
    console.log('ControlsUpdated', controls);

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

                for (let key in controls) {
                    setControls({
                        key: { ...key, value: '' },
                    });
                }
            } else {
                // the response from the server is a user object -> signup was successful
                // we want to put the user object in the state of App.js
                console.log(user);
                this.props.setUser(user);
                this.props.history.push('/users');
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
            <input
                key={formElement.id}
                className={style.Input}
                type={formElement.config.type}
                value={formElement.config.value}
                placeholder={formElement.config.placeholder}
                onChange={(event) => handleChange(event, formElement.id)}
            />
        );
    });

    return (
        <div class="result-card highlight">
            <form onSubmit={handleSubmit}>
                <label for="name">Name</label>
                <input type="text" name="name" value="" required />

                <label for="lastName">Last name</label>
                <input type="text" name="lastName" value="" required />

                <label for="email">Email</label>
                <input type="text" name="email" value="" required unique />

                <label for="">Password</label>
                <input type="password" name="password" required />

                <label for="confirm">Confirm Password</label>
                <input type="password" name="confirm" value="" required />

                <label for="street">Street</label>
                <input type="text" name="street" value="" required />

                <label for="zip">ZIP code</label>
                <input type="text" name="zip" value="" required />

                <label for="city">City</label>
                <input type="text" name="city" value="" required />

                <label for="state">State</label>
                <input type="text" name="state" value="" required />

                <label for="phoneNumber">Phone Number</label>
                <input type="text" name="phoneNumber" value="" required />

                <button type="submit">Sign Up</button>

                {message && <p style="color: red">{message}</p>}

                <p class="account-message">
                    Do you already have an account?
                    <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
