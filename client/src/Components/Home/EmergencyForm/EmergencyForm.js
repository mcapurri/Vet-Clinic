import React, { useState } from 'react';
import style from './EmergencyForm.module.css';
import { updateObject, checkValidity } from '../../../utils/utility';
import Input from '../../UI/Input/Input';
import service from '../../../utils/service';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const EmergencyForm = (props) => {
    const [message, setMessage] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    // const [form, setForm] = useState({
    //     // email: {
    //     //     elementType: 'input',
    //     //     elementConfig: {
    //     //         type: 'email',
    //     //         placeholder: 'Email',
    //     //     },
    //     //     value: '',
    //     //     validation: {
    //     //         required: true,
    //     //         isEmail: true,
    //     //     },
    //     //     valid: false,
    //     //     touched: false,
    //     // },
    //     description: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'textarea',
    //             placeholder: 'Tell us...',
    //         },
    //         value: '',
    //         validation: {
    //             required: true,
    //         },
    //         valid: false,
    //         touched: false,
    //     },
    //     image: {
    //         elementType: 'input',
    //         elementConfig: {
    //             type: 'file',
    //             placeholder: '',
    //         },
    //         value: '',
    //         validation: {},
    //         valid: false,
    //         touched: false,
    //     },
    // });

    const [form, setForm] = useState({
        message: '',
        imageUrl: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log('name, value', name, value);

        setForm({
            ...form,
            [name]: value,
        });
    };

    console.log('formUpdated', form);
    console.log('formIsValid', formIsValid);

    const handleFileUpload = (e) => {
        console.log('The file to be uploaded is: ', e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append('imageUrl', e.target.files[0]);

        service
            .handleUpload(uploadData)
            .then((response) => {
                console.log('response is: ', response);
                // after the console.log we can see that response carries 'secure_url' which we can use to update the state
                setForm({ ...form, imageUrl: response.secure_url });
            })
            .catch((err) => {
                console.log('Error while uploading the file: ', err);
            });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('data im sending', form.description, form.image);
        service
            .saveNewThing(form)
            .then((res) => {
                console.log('added: ', res);
                // axios
                //     .post('/contact/request', {
                //         description: form.description,
                //     })
                //     .then((pet) => {
                //         if (pet.message) {
                //             setMessage(pet.message);

                //             // Reset input values
                //             // for (let key in form) {
                //             //     setForm({
                //             //         ...form,
                //             //         key: { ...key, value: '' },
                //             //     });
                //             // }
                //         } else {
                //             console.log('pet added', pet);
                //             props.history.goBack();
                //         }
                //     });
            })
            .catch((err) => {
                console.log('Error while adding the thing: ', err);
            });
    };

    return (
        <section id="emergencyForm">
            <Form
                className={style.Form}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <textarea
                    name="description"
                    rows="7"
                    cols="40"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Tell us..."
                ></textarea>

                {/* <label for="image">Upload: </label> */}
                <input
                    type="file"
                    name="image"
                    value={form.image}
                    onChange={(e) => handleFileUpload(e)}
                ></input>

                {message && (
                    <p style={{ color: 'red', padding: '0' }}>{message}</p>
                )}
                <div className="buttons">
                    <button onClick={() => props.history.goBack()}>Back</button>

                    <button
                        className={style.Button}
                        type="submit"
                        // disabled={!formIsValid}
                    >
                        Send
                    </button>
                </div>
            </Form>
        </section>
    );
};

export default EmergencyForm;
