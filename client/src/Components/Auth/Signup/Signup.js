import React, { useState } from 'react';
import style from './Signup.module.css';
import { signup } from '../../../utils/auth';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { updateObject, checkValidity } from '../../../utils/utility';
import Input from '../../../Components/UI/Input/Input';

const Signup = (props) => {
    const [message, setMessage] = useState('');
    const [controls, setControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First name',
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
            },
            valid: false,
            touched: false,
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last name',
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
            },
            valid: false,
            touched: false,
        },
        confirm: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirm password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street',
            },
            value: '',
            validation: {
                // required: true,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code',
            },
            value: '',
            validation: {
                // required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City',
            },
            value: '',
            validation: {
                // required: true,
            },
            valid: false,
            touched: false,
        },
        state: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'State',
            },
            value: '',
            validation: {
                // required: true,
            },
            valid: false,
            touched: false,
        },
        phoneNumber: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Phone Num.',
            },
            value: '',
            validation: {
                // required: true,
            },
            valid: false,
            touched: false,
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const handleChange = (e, inputId) => {
        console.log('inputId', inputId);
        console.log('required?', checkValidity(controls[inputId].validation));

        const updatedFormElement = updateObject(controls[inputId], {
            value: e.target.value,
            valid: checkValidity(e.target.value, controls[inputId].validation),
            touched: true, // input in the form has changed
        });
        const updatedControls = updateObject(controls, {
            [inputId]: updatedFormElement,
        });

        let validForm = true;
        for (let inputId in updatedControls) {
            validForm = updatedControls[inputId].valid && formIsValid;
        }
        setControls(updatedControls);
        setFormIsValid(validForm);
    };
    console.log('ControlsUpdated', controls);
    console.log('formIsValid', formIsValid);

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
                <Input
                    className="form-control"
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation} // validation is required
                    touched={formElement.config.touched} // input has changed from initial status
                    changed={(event) => handleChange(event, formElement.id)}
                />
            </div>
        );
    });

    return (
        <Form className={style.Form} onSubmit={handleSubmit}>
            {form}
            <button
                className={style.Button}
                type="submit"
                disabled={!formIsValid}
            >
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
