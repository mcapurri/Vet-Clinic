import React, { useState, useEffect } from 'react';
import style from './MessageDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';

const MessageDetails = (props) => {
    const [message, setMessage] = useState('');
    const [messageId] = useState(props.match.params.id);
    const [userMessage, setUserMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [appointment, setAppointment] = useState('');
    const [sender, setSender] = useState({});
    const [reqAddress, setReqAddress] = useState({});
    const [createdAt, setCreatedAt] = useState('');

    const fetchData = async () => {
        try {
            const message = await axios.get(`/api/messages/${messageId}`);
            console.log('response from DB', message.data[0]);
            setUserMessage(message.data[0].userMessage);
            setImageUrl(message.data[0].imageUrl);
            setSender(message.data[0].sender);
            setAppointment(message.data[0].appointment);
            setReqAddress(message.data[0].address);
            setCreatedAt(message.data[0].createdAt);
        } catch (err) {
            console.log(err.response);
            if (err.response.status === 404) {
                setMessage('Message not found');
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteMessage = async () => {
        try {
            const message = await axios.delete(
                `/api/messages/delete/${messageId}`
            );
            console.log('message', message);
            setMessage(message.data);
            props.history.push('/');
        } catch (err) {
            console.log(err.response);
        }
    };

    if (!createdAt) return <Spinner />;

    return (
        <div className={style.Card}>
            <h4 style={{ paddingBottom: '5%' }}>New message</h4>
            <div className={style.Infos}>
                <div style={{ width: '50%', height: '100%' }}>
                    <p>
                        <b>from: </b>
                        {sender.name} {sender.lastName}
                    </p>
                    <p>
                        <img
                            src="../../../../images/email-logo.png"
                            alt="phone-logo"
                            style={{
                                width: '1.2rem',
                                marginRight: '5%',
                            }}
                        />
                        {sender.email}
                    </p>
                    <p>
                        <img
                            src="../../../../images/phone-logo.png"
                            alt="phone-logo"
                            style={{
                                width: '1.2rem',
                                marginRight: '7%',
                            }}
                        />{' '}
                        {sender.phoneNumber}
                    </p>
                    <p>
                        <b>Received on: </b>
                        {/* {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        }).format(createdAt)} */}
                        {createdAt}
                    </p>
                    {appointment && (
                        <p>
                            <b>Appointment: </b>
                            {appointment}
                        </p>
                    )}
                </div>
                <div
                    style={{
                        width: '50%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                    }}
                >
                    {reqAddress && (
                        <>
                            <p style={{ alignSelf: 'flex-start' }}>
                                <b>Requested service at: </b>
                            </p>
                            <p>
                                &nbsp;<b>Street: </b>
                                {reqAddress.street}
                            </p>
                            <p>
                                &nbsp; <b>City: </b> {reqAddress.city}
                            </p>
                            <p>
                                &nbsp; <b>Zip Code: </b>
                                {reqAddress.zipCode}
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className={style.Container}>
                {userMessage ? userMessage : 'No message'}
            </div>
            <hr />

            <div className={style.Container}>
                <p>
                    <b>Attached:</b>
                </p>
                {imageUrl ? (
                    <div className={style.ImgContainer}>
                        <img src={imageUrl} alt="pet-pic" />
                    </div>
                ) : (
                    <p>No picture attached</p>
                )}
            </div>

            {message && (
                <p style={{ color: 'rgb(5, 58, 32)', padding: '0' }}>
                    {message}
                </p>
            )}

            <div className={style.buttons}>
                <div>
                    <button onClick={() => props.history.goBack()}>Back</button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginRight: '5%',
                        justifyContent: 'space-around',
                        width: '200px',
                    }}
                >
                    <button onClick={deleteMessage}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default MessageDetails;
