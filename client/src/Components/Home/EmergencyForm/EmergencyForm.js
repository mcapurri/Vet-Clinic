import React, { useState, useEffect } from 'react';
import style from './EmergencyForm.module.css';
import { updateObject, checkValidity } from '../../../utils/utility';
import DatePicker, { setHours, setMinutes } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '../../UI/Checkbox/Checkbox';
import service from '../../../utils/service';
import { Form, Button } from 'react-bootstrap';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {
    authenticate,
    loadClient,
    listAll,
    addNewEvent,
} from '../../../utils/googleCalenderEvents';
import axios from 'axios';

const EmergencyForm = (props) => {
    const [message, setMessage] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState({
        userMessage: '',
        imageUrl: '',
        sender: props.user._id,
        appointment: '',
        homeService: false,
        coords: props.requestedAddress.coords,
    });
    const [booking, setBooking] = useState([]);

    // const fetchData = () => {
    //     axios
    //         .get('/api/contacts/appointments')
    //         .then((booking) => {
    //             setBooking(booking.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    useEffect(() => {
        authenticate()
            ?.then(loadClient)
            .then(() => listAll())
            .then((data) => {
                const events = data.map((event) => {
                    return {
                        end: new Date(event.endDate),
                        start: new Date(event.startDate),
                    };
                });
                setBooking(events);
            });
    }, [props.user]);

    const filterBookedTime = (time) => {
        const timeInDay = new Date(time);
        const isBooked = booking.some((event) => {
            return event.start <= timeInDay && event.end >= timeInDay;
        });
        return !isBooked;
    };

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

    // console.log('formUpdated', form);

    // console.log('formIsValid', formIsValid);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(
            'data im sending',
            form.userMessage,
            form.imageUrl,
            props.user._id,
            form.appointment,
            form.homeService
        );

        const newEvent = await addNewEvent({
            startDate: form.appointment,
            endDate: new Date(
                new Date(form.appointment).getTime() + 30 * 60000
            ),
            title: `${props.user.name} ${props.user.lastName} `,
        });

        newEvent &&
            listAll().then((data) => {
                const events = data.map((event) => {
                    return {
                        end: new Date(event.endDate),
                        start: new Date(event.startDate),
                    };
                });
                setBooking(events);
            });

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
                    coords: '',
                });
            })
            .catch((err) => {
                console.log('Error while adding the thing: ', err);
            });
    };

    /// <DatePicker>
    let minTime = new Date();
    minTime.setMinutes(0);
    minTime.setHours(10);

    let maxTime = new Date();
    maxTime.setMinutes(30);
    maxTime.setHours(18);

    if (!props.requestedAddress && !props.user) {
        return null;
    }

    return (
        <section
            id="emergencyForm"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5rem',
            }}
        >
            <Form onSubmit={handleSubmit} className={style.Form}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ paddingBottom: '10%' }}>
                        <DatePicker
                            selected={form.appointment}
                            onChange={(date) =>
                                setForm({ ...form, appointment: date })
                            }
                            showPopperArrow
                            showTimeSelect
                            dateFormat="dd/ MMMM/ yyyy HH:mm  "
                            timeFormat="HH:mm"
                            // minTime={setHours(setMinutes(new Date(), 0), 10)}
                            // maxTime={setHours(setMinutes(new Date(), 30), 18)}
                            minTime={minTime}
                            maxTime={maxTime}
                            placeholderText="Select appointment"
                            // calendarClassName="rasta-stripes"
                            minDate={new Date()}
                            filterDate={(date) =>
                                date.getDay() !== 6 && date.getDay() !== 0
                            }
                            filterTime={filterBookedTime}
                            isClearable
                            // timeIntervals={15}
                            // excludeDates={[new Date(), subDays(new Date(), 1)]}
                            // excludeTimes={booking}
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
                                marginTop: '-10%',
                                transform: 'scale(0.7)',
                            }}
                        >
                            <div>
                                <Form.Label>Street</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Street"
                                    value={
                                        props.requestedAddress?.street !== ''
                                            ? props.requestedAddress?.street
                                            : props.user?.address?.street
                                    }
                                />
                            </div>
                            <div>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    value={
                                        props.requestedAddress?.city !== ''
                                            ? props.requestedAddress?.city
                                            : props.user?.address?.city
                                    }
                                />
                            </div>
                            <div>
                                <Form.Label>ZIP Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="ZIP Code"
                                    value={
                                        props.requestedAddress?.zipCode !== ''
                                            ? props.requestedAddress?.zipCode
                                            : props.user?.address?.zipCode
                                    }
                                />
                            </div>
                        </Form.Group>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}
                >
                    <Form.Group className="d-flex flex-column">
                        <Form.Label htmlFor="message">Your message</Form.Label>
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
                        <div>
                            <AttachFileIcon style={{ color: '#216ba5' }} />
                            <label className="m-0" htmlFor={style.FileLoader}>
                                Attach picture
                            </label>
                            <input
                                id={style.FileLoader}
                                type="file"
                                name="image"
                                value={form.image}
                                onChange={(e) => handleFileUpload(e)}
                            ></input>
                        </div>
                        <Button
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

                        {message && (
                            <p className="d-inline success-msg">{message}</p>
                        )}
                    </Form.Group>
                </div>
            </Form>
        </section>
    );
};

export default EmergencyForm;
