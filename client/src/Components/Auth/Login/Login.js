import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Login.module.css';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { login } from '../../../utils/auth';
import { updateObject, checkValidity } from '../../../utils/utility';

const Login = (props) => {
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
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
                minLenght: 3,
            },
            touched: false,
        },
    });

    const handleChange = (event, controlName) => {
        const updatedForm = updateObject(form, {
            [controlName]: updateObject(form[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    form[controlName].validation
                ),
                touched: true,
            }),
        });

        setForm(updatedForm);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        login({
            email: form.email.value,
            password: form.password.value,
        }).then((user) => {
            if (user.message) {
                setMessage(user.message);

                //Reset input values
                // for (let key in form) {
                //     setForm({ ...form, key: { ...key, value: '' } });
                // }
                console.log('form', form);
            } else {
                //  put the user object in the state of App.js
                console.log(user);
                props.setUser(user);
                props.history.push('/');
            }
        });
    };

    const formElementsArray = [];
    for (let key in form) {
        formElementsArray.push({
            id: key,
            config: form[key],
        });
    }

    let displayedForm = formElementsArray.map((formElement) => (
        <FormControl
            key={formElement.id}
            placeholder={formElement.config.elementConfig.placeholder}
            type={formElement.config.elementConfig.type}
            // aria-label="email"s
            // aria-describedby="basic-addon1"
            style={{ marginRight: '2%' }}
            value={formElement.config.value}
            onChange={(event) => handleChange(event, formElement.id)}
        />
    ));

    return (
        <Form inline className={style.Form} onSubmit={handleSubmit}>
            <div style={{ display: 'flex' }}>
                <InputGroup>{displayedForm}</InputGroup>
                <Button
                    style={{ maxHeight: '3rem', fontSize: '0.9rem' }}
                    type="submit"
                >
                    Log in
                </Button>
            </div>
            <div>
                {message ? (
                    <p style={{ color: 'red' }}>{message}</p>
                ) : (
                    <div>
                        <p>
                            Haven't you registered yet?
                            <Link to={'/signup'} className={style.Button}>
                                Sign up
                            </Link>
                            here
                        </p>
                    </div>
                )}
            </div>
        </Form>
    );
};

export default Login;
