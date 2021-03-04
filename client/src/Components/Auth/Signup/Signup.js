import React, { useState } from 'react';
import style from './Signup.module.css';
import { signup } from '../../../utils/auth';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { updateObject, checkValidity } from '../../../utils/utility';

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
    const [formIsValid, setFormIsValid] = useState(false);

    // const handleChange = (event, controlName) => {
    //     const updatedControls = updateObject(controls, {
    //         [controlName]: updateObject(controls[controlName], {
    //             value: event.target.value,
    //         }),
    //     });

    //     setControls(updatedControls);
    // };
    // console.log('ControlsUpdated', controls);

    const handleChange = (e, inputId) => {
        const updatedFormElement = updateObject(controls[inputId], {
            value: e.target.value,
            valid: checkValidity(e.target.value, controls[inputId].validation),
        });
        const updatedOrderForm = updateObject(controls, {
            [inputId]: updatedFormElement,
        });

        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        setControls(updatedOrderForm);
        setFormIsValid(formIsValid);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        signup({
            name: controls.name.value,
            lastName: controls.lastName.value,
            email: controls.email.value,
            password: controls.password.value,
            confirm: controls.confirm.value,
            street: controls.street.value,
            zipCode: controls.zipCode.value,
            city: controls.city.value,
            state: controls.state.value,
            phoneNumber: controls.phoneNumber.value,
        }).then((user) => {
            if (user.message) {
                setMessage(user.message);

                // Reset input values
                for (let key in controls) {
                    setControls({ ...controls, key: { ...key, value: '' } });
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
