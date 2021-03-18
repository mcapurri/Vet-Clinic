import React, { useState } from 'react';
import style from './EmergencyForm.module.css';
import { updateObject, checkValidity } from '../../../utils/utility';
import Input from '../../UI/Input/Input';
import service from '../../../utils/service';
import { Form, Button } from 'react-bootstrap';
import Content from '../../UI/Content/Content';
import axios from 'axios';

const EmergencyForm = (props) => {
    console.log('props EmForm', props);
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
        userMessage: '',
        imageUrl: '',
        sender: props.user._id,
    });
    const [messageSent, setMessageSent] = useState(null);
    const [disabled, setDisabled] = useState(false);

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
        setMessageSent(false);
        setDisabled(true);

        console.log(
            'data im sending',
            form.userMessage,
            form.imageUrl,
            props.user._id
        );
        service
            .saveNewThing(form)
            .then((res) => {
                console.log('added: ', res);
                setMessageSent(true);
                setDisabled(false);

                // axios
                //     .post('/contact/request', {
                //         message: form.message,
                //     })
                //     .then((pet) => {
                //         if (pet.message) {
                //             setMessage(pet.message);

                // Reset input values
                // for (let key in form) {
                //     setForm({
                //         ...form,
                //         key: { ...key, value: '' },
                //     });
                // }

                setForm({ userMessage: '', imageUrl: '' });
            })
            .catch((err) => {
                console.log('Error while adding the thing: ', err);
            });
    };

    return (
        <section id="emergencyForm">
            {/* <Form
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
            {/* <input
                    type="file"
                    name="image"
                    value={form.image}
                    onChange={(e) => handleFileUpload(e)}
                ></input>

                {message && (
                    <p style={{ color: 'red', padding: '0' }}>{message}</p>
                )}
                <div className="buttons">
                    {/* <button onClick={() => props.history.goBack()}>Back</button> */}

            {/* <button
                        className={style.Button}
                        type="submit"
                        // disabled={!formIsValid}
                    >
                        Send
                    </button>
                </div> */}
            {/* </Form>  */}
            {/* <Content> */}
            <Form onSubmit={handleSubmit} className={style.Form}>
                <Form.Group></Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="message">Your message</Form.Label>
                    <Form.Control
                        id="userMessage"
                        name="userMessage"
                        as="textarea"
                        rows="3"
                        placeholder="Tell us..."
                        style={{
                            width: '20rem',
                            height: '7rem',
                            marginBottom: '5%',
                        }}
                        value={form.message}
                        onChange={handleChange}
                    />
                    {/* <Form.Control
                        id="image"
                        name="image"
                        as="file"
                        rows="3"
                        value={form.image}
                        onChange={(e) => handleFileUpload(e)}
                    /> */}

                    <input
                        type="file"
                        name="image"
                        value={form.image}
                        onChange={(e) => handleFileUpload(e)}
                    ></input>
                </Form.Group>
                <Button
                    className="d-inline-block"
                    variant="primary"
                    type="submit"
                    // disabled={this.state.disable}
                >
                    Send
                </Button>
                {messageSent === true && (
                    <p className="d-inline success-msg">Message Sent</p>
                )}
                {messageSent === false && (
                    <p className="d-inline err-msg">Message Not Sent</p>
                )}
            </Form>
            {/* </Content> */}
        </section>
    );
};

export default EmergencyForm;
