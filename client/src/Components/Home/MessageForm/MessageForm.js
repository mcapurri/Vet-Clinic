import React, { useState, useEffect } from 'react';
import style from './MessageForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from '../../UI/Checkbox/Checkbox';
import service from '../../../utils/service';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import useInput from '../../../utils/useInput';

import {
    authenticate,
    loadClient,
    listAll,
    addNewEvent,
} from '../../../utils/googleCalenderEvents';

const MessageForm = (props) => {
    const [message, setMessage] = useState('');
    const [booking, setBooking] = useState([]);

    const [userMessage, setUserMessage] = useInput('');
    const [imageUrl, setImageUrl] = useState('');
    const [appointment, setAppointment] = useState('');
    // const [sender] = useState(props.user._id);
    const [reqAddress, setReqAddress] = useState({});
    const [homeService, setHomeService] = useState(false);

    // console.log('userMessage', userMessage);
    // console.log('street', reqAddress.street);
    // console.log('zip', reqAddress.zipCode);
    // console.log('city ', reqAddress.city);

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm();

    // console.log('reqAddress', reqAddress);

    useEffect(() => {
        if (homeService === true && props.requestedAddress.street) {
            setReqAddress({
                street: props.requestedAddress.street,
                city: props.requestedAddress.city,
                zipCode: props.requestedAddress.zipCode,
            });
        } else if (
            homeService === true &&
            props.requestedAddress.street === '' &&
            props.user
        ) {
            setReqAddress({
                street: props.user.address.street,
                city: props.user.address.city,
                zipCode: props.user.address.zipCode,
            });
        } else {
            setReqAddress({
                street: '',
                city: '',
                zipCode: '',
            });
        }
    }, [homeService, props.requestedAddress]);

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
            setHomeService(() => !homeService);
            setAppointment('');
            props.setRequestedAddress({ street: '', city: '', zipCode: '' });
        } else {
            setReqAddress({
                ...reqAddress,
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
                setImageUrl(response.secure_url);
            })
            .catch((err) => {
                console.log('Error while uploading the file: ', err);
            });
    };

    const onSubmit = async (data) => {
        // event.preventDefault();
        console.log('data im sending', data);

        if (homeService) {
            service
                .saveNewThing({
                    userMessage: userMessage,
                    imageUrl: imageUrl,
                    id: props.user._id,
                    address: reqAddress,
                    homeService: homeService,
                })
                .then((res) => {
                    console.log('added: ', res.message);

                    setMessage(res.message);

                    // Reset input values
                    setUserMessage('');
                    setImageUrl('');
                    setHomeService(false);
                    setReqAddress('');
                })
                .catch((err) => {
                    console.log('Error while adding the thing: ', err);
                });
        } else {
            const newEvent = await addNewEvent({
                startDate: appointment,
                endDate: new Date(new Date(appointment).getTime() + 30 * 60000),
                title: `${props.user.name} ${props.user.lastName} `,
                notes: `${userMessage}`,
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
            imageUrl &&
                service
                    .saveNewThing({
                        imageUrl,
                        id: props.user._id,
                        appointment,
                        homeService,
                    })
                    .then(async (res) => {
                        await setMessage(res.message);

                        // Reset input values
                        await setUserMessage('');
                        await setImageUrl('');
                        await setHomeService(false);
                        await setReqAddress('');
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
    // console.log(watch());
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
            <Form onSubmit={handleSubmit(onSubmit)} className={style.Form}>
                <div className={style.Container}>
                    <div
                        style={{
                            padding: '5% 0',
                        }}
                    >
                        <DatePicker
                            selected={appointment}
                            onChange={(date) => setAppointment(date)}
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
                            value={appointment}
                            disabled={homeService}
                        />
                    </div>
                    <div className={style.AddressContainer}>
                        <Checkbox
                            name="homeRequest"
                            label="Request home service"
                            checked={homeService}
                            handleChange={handleChange}
                            value={homeService}
                            disabled={!props.user}
                        />
                        <Form.Group style={{ width: '100%' }}>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                {...register('street', { required: true })}
                                className={style.addressInput}
                                type="text"
                                placeholder="Street"
                                value={reqAddress?.street}
                                onChange={handleChange}
                            />

                            <Form.Label>ZIP Code</Form.Label>
                            <Form.Control
                                {...register('zipCode', {
                                    required: true,
                                    minLength: 5,
                                    maxLength: 5,
                                })}
                                className={style.addressInput}
                                type="text"
                                placeholder="ZIP Code"
                                value={reqAddress?.zipCode}
                                onChange={handleChange}
                            />
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                {...register('city', {
                                    required: true,
                                    minLength: 2,
                                })}
                                className={style.addressInput}
                                type="text"
                                placeholder="City"
                                value={reqAddress?.city}
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
                        value={userMessage}
                        onChange={setUserMessage}
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
                            value={imageUrl}
                            onChange={(e) => handleFileUpload(e)}
                        />
                    </div>
                    {message && (
                        <p style={{ color: 'rgb(5, 58, 32)' }}>{message}</p>
                    )}
                    <Button
                        className={style.Button}
                        variant="primary sm"
                        type="submit"
                        disabled={!props.user}
                    >
                        Send
                    </Button>
                </Form.Group>
            </Form>
        </section>
    );
};

export default MessageForm;
