import React, { useState, useEffect, useRef } from 'react';
import style from './EmergencyForm.module.css';
import { updateObject, checkValidity } from '../../../utils/utility';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '../../UI/Checkbox/Checkbox';
import service from '../../../utils/service';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EmergencyForm = (props) => {
    console.log('props', props);
    const [message, setMessage] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState({
        userMessage: '',
        imageUrl: '',
        sender: props.user._id,
        appointment: '',
        homeService: false,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log('name, value', name, value);
        if (event.target.type === 'checkbox') {
            setForm({
                ...form,
                homeService: !form.homeService,
                appointment: '',
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
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
            props.user._id,
            form.appointment,
            form.homeService
        );
        service
            .saveNewThing(form)
            .then((res) => {
                console.log('added: ', res.message);

                setMessage(res.message);

                // Reset input values
                setForm({
                    userMessage: '',
                    imageUrl: '',
                    appointment: '',
                    homeService: false,
                });
            })
            .catch((err) => {
                console.log('Error while adding the thing: ', err);
            });
    };

    return (
        <section
            id="emergencyForm"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Form onSubmit={handleSubmit} className={style.Form}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start',
                        margin: '0 5%',
                        minHeight: '80%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '50%',
                            height: '100%',
                            marginLeft: '5%',
                        }}
                    >
                        <Form.Group>
                            <Form.Label htmlFor="message">
                                Your message
                            </Form.Label>
                            <Form.Control
                                className={style.Textarea}
                                id="userMessage"
                                name="userMessage"
                                as="textarea"
                                rows="3"
                                placeholder="Tell us..."
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
                        <Button
                            className="d-inline-block"
                            className={style.Button}
                            variant="primary sm"
                            type="submit"
                            // disabled={
                            //     (!form.userMessage && !form.appointment) ||
                            //     (!form.userMessage && !form.homeService)
                            // }
                        >
                            Send
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '0 5% 0 0',
                        }}
                    >
                        <div style={{ paddingBottom: '10%' }}>
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
                                disabled={form.homeService}
                                style={{
                                    width: '80%',
                                }}
                            />
                        </div>

                        <Checkbox
                            name="homeRequest"
                            label="Request home service"
                            checked={form.homeService}
                            handleChange={handleChange}
                            value={form.homeService}
                        />
                        {form.homeService && (
                            <Form.Group
                                style={{
                                    // transform: 'scale(0.7)',
                                    marginTop: '-10%',
                                }}
                            >
                                <Form.Label>Street</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Street"
                                    value={props.user.address.street}
                                />
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    value={props.user.address.city}
                                />

                                <Form.Label>ZIP Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="ZIP Code"
                                    value={props.user.address.zipCode}
                                />
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="State"
                                    value={props.user.address.state}
                                />
                            </Form.Group>
                        )}
                    </div>
                </div>

                {/* <button className={style.Button}>Send</button> */}
                {message && <p className="d-inline success-msg">{message}</p>}
            </Form>
        </section>
    );
};

export default EmergencyForm;
