import React, { useState, useEffect } from 'react';
import style from './MessageDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
// import { parseISOString } from '../../../utils/utility';
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
            const token = localStorage.getItem('token');
            const message = await axios.get(`/api/messages/${messageId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('response from DB', message.data[0]);
            setUserMessage(message.data[0].userMessage);
            setImageUrl(message.data[0].imageUrl);
            setSender(message.data[0].sender);
            setAppointment(message.data[0].appointment);
            setReqAddress(message.data[0].address);
            setCreatedAt(message.data[0].createdAt);
        } catch (err) {
            console.log(err);
            if (err.response?.status === 404) {
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
            console.log('message', message.data.msg);
            setMessage(message.data.msg);
            props.history.push('/');
        } catch (err) {
            console.log(err.response);
        }
    };

    if (!createdAt) return <Spinner />;

    return (
        <div className={style.Container}>
            <div className={style.Card}>
                <h4 style={{ paddingBottom: '5%', color: 'rgb(92, 41, 168)' }}>
                    New message
                </h4>
                <div className={style.Infos}>
                    <div style={{ width: '50%', height: '100%' }}>
                        <p>
                            <b style={{ color: 'rgb(92, 41, 168)' }}>from: </b>
                            {sender.name} {sender.lastName}
                        </p>
                        <p>
                            <img
                                src="../../../../images/email-logo.png"
                                alt="phone-logo"
                                style={{
                                    width: '1.2rem',
                                    marginRight: '5%',
                                    color: 'rgb(92, 41, 168)',
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
                                    color: 'rgb(92, 41, 168)',
                                }}
                            />{' '}
                            {sender.phoneNumber}
                        </p>
                        <p>
                            <b style={{ color: 'rgb(92, 41, 168)' }}>
                                Received on:{' '}
                            </b>
                            {/* {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        }).format(createdAt)} */}
                            {createdAt.substring(0, 10)}
                        </p>
                        {appointment && (
                            <p>
                                <b style={{ color: 'rgb(92, 41, 168)' }}>
                                    Appointment:{' '}
                                </b>
                                {appointment.substring(0, 10)}
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
                                <p
                                    style={{
                                        alignSelf: 'flex-start',
                                        color: 'rgb(92, 41, 168)',
                                    }}
                                >
                                    <b>Requested service at: </b>
                                </p>
                                <p>
                                    &nbsp;
                                    <b style={{ color: 'rgb(92, 41, 168)' }}>
                                        Street:{' '}
                                    </b>
                                    {reqAddress.street}
                                </p>
                                <p>
                                    &nbsp;{' '}
                                    <b style={{ color: 'rgb(92, 41, 168)' }}>
                                        City:{' '}
                                    </b>{' '}
                                    {reqAddress.city}
                                </p>
                                <p>
                                    &nbsp;{' '}
                                    <b style={{ color: 'rgb(92, 41, 168)' }}>
                                        Zip Code:{' '}
                                    </b>
                                    {reqAddress.zipCode}
                                </p>
                            </>
                        )}
                    </div>
                </div>
                <div className={style.InnerContainer}>
                    {userMessage ? userMessage : 'No message'}
                </div>
                <hr />

                <div className={style.InnerContainer}>
                    <p>
                        <b style={{ color: 'rgb(92, 41, 168)' }}>Attached:</b>
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
                        <button onClick={() => props.history.goBack()}>
                            Back
                        </button>
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
        </div>
    );
};

export default MessageDetails;
