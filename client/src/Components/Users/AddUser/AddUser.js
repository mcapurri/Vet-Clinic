import React, { useState } from 'react';
import style from './AddUser.module.css';
import useInput from '../../../utils/useInput';
import { Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddUser = (props) => {
    const {
        register,
        handleSubmit,
        watch,
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

    const onSubmit = async (data) => {
        console.log('data', data);
        axios
            .post('/api/users/add', {
                firstName,
                lastName,
                email,
                street,
                zipCode,
                city,
                phoneNumber,
                role,
            })
            .then((user) => {
                if (user.message) {
                    setMessage(user.message);

                    // Reset input values
                    // for (let key in form) {
                    //     setForm({
                    //         ...form,
                    //         key: { ...key, value: '' },
                    //     });
                    // }
                } else {
                    console.log('user added', user);
                    props.history.goBack();
                }
                // update the list of users
                // props.fetchData();
            });
    };
    // const [form, setForm] = useState({
    //     name: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'First name',
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             minLength: 2,
    //         },
    //         valid: false,
    //         touched: false,
    //     },
    //     lastName: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'Last name',
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             minLength: 2,
    //         },
    //         valid: false,
    //         touched: false,
    //     },
    //     email: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'email',
    //             placeholder: 'Email',
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //             isEmail: true,
    //             unique: true, /// you still have to write the code for this validation
    //         },
    //         valid: false,
    //         touched: false,
    //     },
    //     street: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'Street',
    //         },
    //         value: '',
    //         validation: {
    //             // required: true,
    //         },
    //         valid: false,
    //         touched: false,
    //     },
    //     zipCode: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'ZIP Code',
    //         },
    //         value: '',
    //         validation: {
    //             // required: true,
    //             minLength: 5,
    //             maxLength: 5,
    //         },
    //         valid: false,
    //         touched: false,
    //     },
    //     city: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'City',
    //         },
    //         value: '',
    //         validation: {
    //             // required: true,
    //         },
    //         valid: false,
    //         touched: false,
    //     },
    //     // state: {
    //     //     elementType: 'input',
    //     //     elementConfig: {
    //     //         type: 'text',
    //     //         placeholder: 'State',
    //     //     },
    //     //     value: '',
    //     //     validation: {
    //     //         // required: true,
    //     //     },
    //     //     valid: false,
    //     //     touched: false,
    //     // },

    //     phoneNumber: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'text',
    //             placeholder: 'Phone Num.',
    //         },
    //         value: '',
    //         validation: {
    //             // required: true,
    //         },
    //         valid: false,
    //         touched: false,
    //     },
    //     role: {
    //         elementType: 'select',
    //         elementConfig: {
    //             options: [
    //                 { value: 'employee', displayValue: 'employee' },
    //                 { value: 'client', displayValue: 'client' },
    //             ],
    //         },
    //         value: 'client',
    //         validation: {},
    //         valid: true,
    //     },
    // });
    // const [formIsValid, setFormIsValid] = useState(false);

    // const handleChange = (e, inputId) => {
    //     console.log('inputId', inputId);
    //     console.log('required?', checkValidity(form[inputId].validation));

    //     const updatedFormElement = updateObject(form[inputId], {
    //         value: e.target.value,
    //         valid: checkValidity(e.target.value, form[inputId].validation),
    //         touched: true, // input in the form has changed
    //     });
    //     const updatedForm = updateObject(form, {
    //         [inputId]: updatedFormElement,
    //     });

    //     let validForm = true;
    //     for (let inputId in updatedForm) {
    //         validForm = updatedForm[inputId].valid && validForm;
    //     }
    //     setForm(updatedForm);
    //     setFormIsValid(validForm);
    // };
    // console.log('formUpdated', form);
    // console.log('formIsValid', formIsValid);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios
    //         .post('/api/users/add', {
    //             name: firstName,
    //             lastName,
    //             email,
    //             street,
    //             zipCode,
    //             city,
    //             phoneNumber,
    //             role,
    //         })
    //         .then((user) => {
    //             if (user.message) {
    //                 setMessage(user.message);

    //                 // Reset input values
    //                 for (let key in form) {
    //                     setForm({
    //                         ...form,
    //                         key: { ...key, value: '' },
    //                     });
    //                 }
    //             } else {
    //                 console.log('user added', user);
    //                 props.history.goBack();
    //             }
    //             // update the list of users
    //             // props.fetchData();
    //         });
    // };
    // // Make dynamic input tags for the form
    // const formElementsArray = [];
    // for (let formElement in form) {
    //     formElementsArray.push({
    //         id: formElement,
    //         config: form[formElement],
    //     });
    // }
    // let displayedForm = formElementsArray.map((formElement) => {
    //     return (
    //         <div className="form-group" key={formElement.id}>
    //             <Input
    //                 className="form-control"
    //                 elementType={formElement.config.elementType}
    //                 elementConfig={formElement.config.elementConfig}
    //                 value={formElement.config.value}
    //                 invalid={!formElement.config.valid}
    //                 shouldValidate={formElement.config.validation} // validation is required
    //                 touched={formElement.config.touched} // input has changed from initial status
    //                 changed={(event) => handleChange(event, formElement.id)}
    //             />
    //         </div>
    //     );
    // });

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
                    // placeholder="C"
                    name="role"
                    value={role}
                    onChange={setRole}
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

            {/* <Link to="/">Back</Link> */}
        </Form>
    );
};

export default AddUser;
