import React, { useState } from 'react';
import style from './AddUser.module.css';
import { updateObject, checkValidity } from '../../../utils/utility';
import Input from '../../../Components/UI/Input/Input';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const AddUser = (props) => {
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
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
                unique: true, /// you still have to write the code for this validation
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
        role: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'employee', displayValue: 'employee' },
                    { value: 'client', displayValue: 'client' },
                ],
            },
            value: 'client',
            validation: {},
            valid: true,
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const handleChange = (e, inputId) => {
        console.log('inputId', inputId);
        console.log('required?', checkValidity(form[inputId].validation));

        const updatedFormElement = updateObject(form[inputId], {
            value: e.target.value,
            valid: checkValidity(e.target.value, form[inputId].validation),
            touched: true, // input in the form has changed
        });
        const updatedForm = updateObject(form, {
            [inputId]: updatedFormElement,
        });

        let validForm = true;
        for (let inputId in updatedForm) {
            validForm = updatedForm[inputId].valid && formIsValid;
        }
        setForm(updatedForm);
        setFormIsValid(validForm);
    };
    console.log('formUpdated', form);
    console.log('formIsValid', formIsValid);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('/api/users/add', {
                name: form.name.value,
                lastName: form.lastName.value,
                email: form.email.value,

                street: form.street.value,
                zipCode: form.zipCode.value,
                city: form.city.value,
                state: form.state.value,
                phoneNumber: form.phoneNumber.value,
            })
            .then((user) => {
                if (user.message) {
                    setMessage(user.message);

                    // Reset input values
                    for (let key in form) {
                        setForm({
                            ...form,
                            key: { ...key, value: '' },
                        });
                    }
                } else {
                    // the response from the server is a user object -> signup was successful
                    // we want to put the user object in the state of App.js
                    console.log('user from Signup', user);
                    console.log('props Signup', props);
                    props.setUser(user);
                    props.history.push('/');
                }
                // update the list of projects in Projects.js - we use the getData function
                // in the props
                props.fetchData();
            });
    };
    // Make dynamic input tags for the form
    const formElementsArray = [];
    for (let formElement in form) {
        formElementsArray.push({
            id: formElement,
            config: form[formElement],
        });
    }
    let displayedForm = formElementsArray.map((inputField) => {
        return (
            <div className="form-group" key={inputField.id}>
                <Input
                    className="form-control"
                    elementType={inputField.config.elementType}
                    elementConfig={inputField.config.elementConfig}
                    value={inputField.config.value}
                    invalid={!inputField.config.valid}
                    shouldValidate={inputField.config.validation} // validation is required
                    touched={inputField.config.touched} // input has changed from initial status
                    changed={(event) => handleChange(event, inputField.id)}
                />
            </div>
        );
    });

    return (
        <div>
            <Form className={style.Form} onSubmit={handleSubmit}>
                {displayedForm}
                <button
                    className={style.Button}
                    type="submit"
                    // disabled={!formIsValid}
                >
                    <h1 style={{ fontSize: 'bold' }}>+</h1>
                </button>

                {message && <p style={{ color: 'red' }}>{message}</p>}
            </Form>
        </div>
    );
};

export default AddUser;
