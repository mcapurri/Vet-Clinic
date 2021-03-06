import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Login.module.css';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { login } from '../../../utils/auth';
import { updateObject, checkValidity } from '../../../utils/utility';
// import Input from '../../../Components/UI/Input/Input';

const Login = (props) => {
    const [message, setMessage] = useState('');
    const [controls, setControls] = useState({
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
            },
            touched: false,
        },
    });

    const toggleShowForm = () => {
        props.setShowForm(() => !props.showForm);
    };

    const handleChange = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    controls[controlName].validation
                ),
                touched: true,
            }),
        });

        setControls(updatedControls);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        login({
            email: controls.email.value,
            password: controls.password.value,
        }).then((user) => {
            if (user.message) {
                setMessage(user.message);

                //Reset input values
                for (let key in controls) {
                    setControls({ ...controls, key: { ...key, value: '' } });
                }
            } else {
                // the response from the server is a user object -> signup was successful
                // we want to put the user object in the state of App.js
                console.log(user);
                props.setUser(user);
                props.history.push('/');
            }
        });
    };

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        });
    }

    let form = formElementsArray.map((formElement) => (
        <FormControl
            key={formElement.id}
            placeholder={formElement.config.elementConfig.placeholder}
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
                <InputGroup>{form}</InputGroup>
                <Button
                    style={{ maxHeight: '3rem', fontSize: '0.9rem' }}
                    type="submit"
                >
                    Log in
                </Button>
            </div>
            <div>
                {message ? (
                    <p style={{ color: 'red' }}>{{ message }}</p>
                ) : (
                    <div>
                        <p
                            style={{
                                color: '#fff ',
                                width: '100%',
                                marginTop: '5%',
                            }}
                        >
                            Haven't you registered yet?
                            <Link
                                className={style.Button}
                                onClick={toggleShowForm}
                            >
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
