import React, { useState, useEffect, useRef } from 'react';
import style from './EmergencyForm.module.css';
import { updateObject, checkValidity } from '../../../utils/utility';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import AppointmentPicker from './AppointmentPicker/AppointmentPicker';
import service from '../../../utils/service';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EmergencyForm = (props) => {
    const [message, setMessage] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState({
        userMessage: '',
        imageUrl: '',
        sender: props.user._id,
        appointment: '',
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

                setMessage(res.message);

                // Reset input values
                setForm({ userMessage: '', imageUrl: '', appointment: '' });
            })
            .catch((err) => {
                console.log('Error while adding the thing: ', err);
            });
    };

    return (
        <section id="emergencyForm">
            <Form onSubmit={handleSubmit} className={style.Form}>
                <Form.Group></Form.Group>

                <Form.Group
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <DatePicker
                            selected={form.appointment}
                            onChange={(date) =>
                                setForm({ ...form, appointment: date })
                            }
                            showTimeSelect
                            dateFormat="dd/ MMMM/ yyyy h:mm a"
                            placeholderText="Select appointment"
                            minDate={new Date()}
                            filterDate={(date) =>
                                date.getDay() !== 6 && date.getDay() !== 0
                            }
                            isClearable
                            timeIntervals={15}
                            // excludeDates={[new Date(), subDays(new Date(), 1)]}
                            value={form.appointment}
                        />
                    </div>
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
                        value={form.userMessage}
                        onChange={handleChange}
                    />

                    <input
                        type="file"
                        name="image"
                        value={form.image}
                        onChange={(e) => handleFileUpload(e)}
                    ></input>
                </Form.Group>
                {/* </div> */}

                <Button
                    className="d-inline-block"
                    variant="primary"
                    type="submit"
                    // disabled={this.state.disable}
                >
                    Send
                </Button>
                {/* {messageSent === true && (
                    <p className="d-inline success-msg">Message Sent</p>
                )}
                {messageSent === false && (
                    <p className="d-inline err-msg">Message Not Sent</p>
                )} */}
                {message && <p className="d-inline success-msg">{message}</p>}
            </Form>
            {/* </Content> */}
        </section>
    );
};

export default EmergencyForm;
