import React, { useState, useEffect } from 'react';
import style from './AddPet.module.css';
import { updateObject, checkValidity } from '../../../utils/utility';
import Input from '../../../Components/UI/Input/Input';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const AddPet = (props) => {
    console.log('AddPet props', props);
    const [message, setMessage] = useState('');

    const [form, setForm] = useState({
        specie: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'dog', displayValue: 'dog' },
                    { value: 'cat', displayValue: 'cat' },
                    { value: 'rodent', displayValue: 'rodent' },
                    { value: 'bird', displayValue: 'bird' },
                    { value: 'reptile', displayValue: 'reptile' },
                    { value: 'other', displayValue: 'other' },
                ],
            },
            validation: {},
            valid: true,
        },

        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name',
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
            },
            valid: false,
            touched: false,
        },

        breed: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Breed',
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
            },
            valid: false,
            touched: false,
        },
        age: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Age',
            },
            value: '',
            validation: {
                minLength: 1,
            },
            valid: false,
            touched: false,
        },
        diagnosis: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Diagnosis',
            },
            value: '',
            validation: {
                minLength: 3,
            },
            valid: false,
            touched: false,
        },
        treatment: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Treatment',
            },
            value: '',
            validation: {
                minLength: 3,
            },
            valid: false,
            touched: false,
        },

        owner: {
            elementType: 'select',
            elementConfig: {
                options: [],
            },
            validation: {},
            valid: true,
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get('/api/users/owners')
            .then((users) => {
                console.log('options from DB', users.data);
                setForm({
                    ...form,
                    owner: {
                        ...form.owner,
                        elementConfig: {
                            ...form.elementConfig,
                            options: users.data,
                        },
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    console.log('addPet form', form);

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
            validForm = updatedForm[inputId].valid && validForm;
        }
        setForm(updatedForm);
        setFormIsValid(validForm);
    };
    console.log('formUpdated', form);
    console.log('formIsValid', formIsValid);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('/api/pets/add', {
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
        let inputs = '';
        {
            props.isEmployee &&
                (inputs = (
                    <div className="form-group" key={formElement.id}>
                        <Input
                            className="form-control"
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation} // validation is required
                            touched={formElement.config.touched} // input has changed from initial status
                            changed={(event) =>
                                handleChange(event, formElement.id)
                            }
                        />
                    </div>
                ));
        }

        {
            formElement.id !== 'owner' &&
                (inputs = (
                    <div className="form-group" key={formElement.id}>
                        <Input
                            className="form-control"
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation} // validation is required
                            touched={formElement.config.touched} // input has changed from initial status
                            changed={(event) =>
                                handleChange(event, formElement.id)
                            }
                        />
                    </div>
                ));
            // setForm({
            //     ...form,
            //     owner: {
            //         ...form.owner,
            //         elementConfig: {
            //             ...form.elementConfig,
            //             options: {
            //                 value: props.user._id,
            //                 displayValue: `${props.user.lastName}, ${props.user.lastName}`,
            //             },
            //         },
            //     },
            // });
        }

        return inputs;
    });

    return (
        <div>
            <Form className={style.Form} onSubmit={handleSubmit}>
                <h3>Add pet</h3>
                {displayedForm}
                <button className={style.Button} type="submit">
                    <span>+</span>
                </button>
                <button onClick={() => props.history.goBack()}>Back</button>

                {message && <p style={{ color: 'red' }}>{message}</p>}
            </Form>
        </div>
    );
};

export default AddPet;
