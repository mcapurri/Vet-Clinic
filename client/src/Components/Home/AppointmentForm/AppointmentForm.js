import React, { useState, useEffect } from 'react';
import style from './AppointmentForm.module.css';
import DatePicker from 'react-datepicker';
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

const AppointmentForm = (props) => {
    const [message, setMessage] = useState('');
    // const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState({
        userMessage: '',
        imageUrl: '',
        sender: props.user._id,
        appointment: '',
        homeService: false,
        coords: props.requestedAddress.coords,
    });
    const [booking, setBooking] = useState([]);

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

    const handleFileUpload = (e) => {
        console.log('The file to be uploaded is: ', e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since I pass
        // req.body to .create() method
        uploadData.append('imageUrl', e.target.files[0]);

        service
            .handleUpload(uploadData)
            .then((response) => {
                console.log('response is: ', response);
                // response carries 'secure_url' which I can use to update the state
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
            notes: form.userMessage,
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
            id="appointmentForm"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5rem',
            }}
        >
            <Form onSubmit={handleSubmit} className={style.Form}>
                <div className={style.Container}>
                    <div style={{ paddingTop: '5%' }}>
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
                    <div className={style.AddressContainer}>
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
                                <div className={style.Inputfield}>
                                    <Form.Label>Street</Form.Label>
                                    <Form.Control
                                        className={style.addressInput}
                                        type="text"
                                        placeholder="Street"
                                        value={
                                            props.requestedAddress?.street !==
                                            ''
                                                ? props.requestedAddress?.street
                                                : props.user?.address?.street
                                        }
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        className={style.addressInput}
                                        type="text"
                                        placeholder="City"
                                        value={
                                            props.requestedAddress?.city !== ''
                                                ? props.requestedAddress?.city
                                                : props.user?.address?.city
                                        }
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Form.Label>ZIP Code</Form.Label>
                                    <Form.Control
                                        className={style.addressInput}
                                        type="text"
                                        placeholder="ZIP Code"
                                        value={
                                            props.requestedAddress?.zipCode !==
                                            ''
                                                ? props.requestedAddress
                                                      ?.zipCode
                                                : props.user?.address?.zipCode
                                        }
                                        onChange={handleChange}
                                    />
                                </div>
                            </Form.Group>
                        )}
                    </div>
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
                                Attach photo
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

export default AppointmentForm;
