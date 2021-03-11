import React, { useState } from 'react';
import style from './EmergencyForm.module.css';
import { updateObject, checkValidity } from '../../../utils/utility';
import Input from '../../UI/Input/Input';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const EmergencyForm = (props) => {
    const [message, setMessage] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
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
    });

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
        axios
            .post('/users/request', {
                name: form.name.value,
                specie: form.specie.value,
                breed: form.breed.value,
                age: form.age.value,
                diagnosis: form.diagnosis.value,
                treatment: form.treatment.value,
                owner: form.owner.value,
            })
            .then((pet) => {
                if (pet.message) {
                    setMessage(pet.message);

                    // Reset input values
                    // for (let key in form) {
                    //     setForm({
                    //         ...form,
                    //         key: { ...key, value: '' },
                    //     });
                    // }
                } else {
                    console.log('pet added', pet);
                    props.history.goBack();
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
    let displayedForm = formElementsArray.map((formElement) => {
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
        <section id="emergencyForm">
            <Form className={style.Form} onSubmit={handleSubmit}>
                {displayedForm}
                <button
                    className={style.Button}
                    type="submit"
                    // disabled={!formIsValid}
                >
                    Send
                </button>
                {message && (
                    <p style={{ color: 'red', padding: '0' }}>{message}</p>
                )}

                <button onClick={() => props.history.goBack()}>Back</button>
            </Form>
        </section>
    );
};

export default EmergencyForm;
