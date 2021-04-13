import React, { useState, useEffect } from 'react';
import style from './MessageForm.module.css';
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

const MessageForm = (props) => {
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        userMessage: '',
        imageUrl: '',
        sender: props.user._id,
        appointment: '',
        homeService: false,
        address: {
            street: '',
            city: '',
            zipCode: '',
        },
    });
    const [booking, setBooking] = useState([]);
    // console.log('form', form);

    // form.homeService && props.requestedAddress
    //     ? setForm({
    //           ...form,
    //           address: {
    //               street: props.requestedAddress.street,
    //               city: props.requestedAddress.city,
    //               zipCode: props.requestedAddress.zipCode,
    //           },
    //       })
    //     : form.homeService && !props.requestedAddress && props.user
    //     ? setForm({
    //           ...form,
    //           address: {
    //               street: props.user.address.street,
    //               city: props.user.address.city,
    //               zipCode: props.user.address.zipCode,
    //           },
    //       })
    //     : null;

    useEffect(() => {
        if (form.homeService === true && props.requestedAddress.street) {
            setForm({
                ...form,
                address: {
                    street: props.requestedAddress.street,
                    city: props.requestedAddress.city,
                    zipCode: props.requestedAddress.zipCode,
                },
            });
        } else if (
            form.homeService === true &&
            props.requestedAddress.street === '' &&
            props.user
        ) {
            setForm({
                ...form,
                address: {
                    street: props.user.address.street,
                    city: props.user.address.city,
                    zipCode: props.user.address.zipCode,
                },
            });
        } else {
            setForm({
                ...form,
                address: {
                    street: '',
                    city: '',
                    zipCode: '',
                },
            });
        }
    }, [form.homeService, props.requestedAddress]);

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
        if (event.target.type === 'checkbox') {
            setForm({
                ...form,
                homeService: !form.homeService,
                appointment: '',
            });
            props.setRequestedAddress({ street: '', city: '', zipCode: '' });
        } else {
            setForm({
                ...form,
                ...form.address,
                [name]: value,
            });
        }
    };

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
            props.user._id
        );

        if (form.homeService) {
            service
                .saveNewThing({
                    userMessage: form.userMessage,
                    imageUrl: form.imageUrl,
                    id: props.user._id,
                    address: {
                        street: form.address.street,
                        city: form.address.city,
                        zipCode: form.address.zipCode,
                    },
                    homeService: form.homeService,
                })
                .then((res) => {
                    console.log('added: ', res.message);

                    setMessage(res.message);

                    // Reset input values
                    setForm({
                        userMessage: '',
                        imageUrl: '',
                        homeService: false,
                        address: {
                            street: '',
                            city: '',
                            zipCode: '',
                        },
                    });
                })
                .catch((err) => {
                    console.log('Error while adding the thing: ', err);
                });
        } else {
            const newEvent = await addNewEvent({
                startDate: form.appointment,
                endDate: new Date(
                    new Date(form.appointment).getTime() + 30 * 60000
                ),
                title: `${props.user.name} ${props.user.lastName} `,
                notes: `${form.userMessage}`,
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
            form.imageUrl &&
                service
                    .saveNewThing({
                        imageUrl: form.imageUrl,
                        id: props.user._id,
                        appointment: form.appointment,
                        homeService: form.homeService,
                    })
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
        }
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
            id="messageForm"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5rem',
            }}
        >
            <Form onSubmit={handleSubmit} className={style.Form}>
                <div className={style.Container}>
                    <div
                        style={{
                            padding: '5% 0',
                        }}
                    >
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
                        />
                    </div>
                    <div className={style.AddressContainer}>
                        <Checkbox
                            name="homeRequest"
                            label="Request home service"
                            checked={form.homeService}
                            handleChange={handleChange}
                            value={form.homeService}
                            disabled={!props.user}
                        />
                        <Form.Group style={{ width: '100%' }}>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                className={style.addressInput}
                                type="text"
                                placeholder="Street"
                                value={form.address.street}
                                onChange={handleChange}
                            />
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                className={style.addressInput}
                                type="text"
                                placeholder="City"
                                value={form.address.city}
                                onChange={handleChange}
                            />
                            <Form.Label>ZIP Code</Form.Label>
                            <Form.Control
                                className={style.addressInput}
                                type="text"
                                placeholder="ZIP Code"
                                value={form.address.zipCode}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                </div>

                <Form.Group className={style.Group}>
                    <Form.Label className={style.Label} htmlFor="message">
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
                    <div className={style.Loader}>
                        <AttachFileIcon style={{ color: '#216ba5' }} />
                        <label
                            className="m-0"
                            htmlFor={style.FileLoader}
                            style={{ cursor: 'pointer' }}
                        >
                            Attach photo
                        </label>
                        <input
                            id={style.FileLoader}
                            type="file"
                            name="image"
                            value={form.image}
                            onChange={(e) => handleFileUpload(e)}
                        />
                    </div>
                    {message && (
                        <p style={{ color: ' color: rgb(5, 58, 32)' }}>
                            {message}
                        </p>
                    )}
                    <Button
                        className={style.Button}
                        variant="primary sm"
                        type="submit"
                        disabled={
                            !props.user
                            // (!props.user && !form.appointment) ||
                            // (!props.user &&
                            //     !form.userMessage &&
                            //     !form.homeService)
                        }
                    >
                        Send
                    </Button>
                </Form.Group>
            </Form>
        </section>
    );
};

export default MessageForm;
