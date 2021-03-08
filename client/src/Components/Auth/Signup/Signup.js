import React, { useState } from 'react';
import style from './Signup.module.css';
import { signup } from '../../../utils/auth';
import { Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../../utils/utility';
import Input from '../../../Components/UI/Input/Input';

const Signup = (props) => {
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

        signup({
            name: form.name.value,
            lastName: form.lastName.value,
            email: form.email.value,
            password: form.password.value,
            confirm: form.confirm.value,
            street: form.street.value,
            zipCode: form.zipCode.value,
            city: form.city.value,
            state: form.state.value,
            phoneNumber: form.phoneNumber.value,
        }).then((user) => {
            if (user.message) {
                setMessage(user.message);

                // Reset input values
                for (let inputField in form) {
                    setForm({
                        ...form,
                        inputField: { ...inputField, value: '' },
                    });
                }
            } else {
                // signup was successful
                props.setUser(() => user);
                <Redirect to={'/'} />;
            }
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
        <Form className={style.Form} onSubmit={handleSubmit}>
            {displayedForm}
            <button
                className={style.Button}
                type="submit"
                // disabled={!formIsValid}
            >
                Sign up
            </button>
            {message && <p style={{ color: 'red', padding: '0' }}>{message}</p>}

            {/* <p>
                Do you already have an account? <Link to="/">Login</Link>
            </p> */}
            <Link to="/">Back</Link>
        </Form>
    );
};

export default Signup;
