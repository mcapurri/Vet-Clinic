import React, { useState, useEffect } from 'react';
import style from './MessageDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';

const MessageDetails = (props) => {
    const [message, setMessage] = useState('');
    const [selectedMessage, setSelectedMessage] = useState('');

    console.log('selectedMessage', selectedMessage);

    const fetchData = async () => {
        await axios
            .get(`/api/messages/${props.match.params.id}`)
            .then((response) => {
                // console.log('response from DB', response.data[0]);

                setSelectedMessage(response.data[0]);
            })

            .catch((err) => {
                console.log(err.response);
                if (err.response.status === 404) {
                    setMessage('Message not found');
                }
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteMessage = async () => {
        await axios
            .delete(`/api/messages/delete/${selectedMessage._id}`)
            .then((response) => {
                setMessage(response.data);
                props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!selectedMessage) return <Spinner />;

    return (
        <div className={style.Card}>
            <h4 style={{ paddingBottom: '5%' }}>New message</h4>
            <div className={style.Infos}>
                <div style={{ width: '50%', height: '100%' }}>
                    <p>
                        <b>from: </b>
                        {selectedMessage.sender.name}{' '}
                        {selectedMessage.sender.lastName}
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
                        {selectedMessage.sender.email}
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
                        {selectedMessage.sender.phoneNumber}
                    </p>
                    <p>
                        <b>Received on </b>
                        {/* {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        }).format(selectedMessage.createdAt)} */}
                        {selectedMessage.createdAt}
                    </p>
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
                    {selectedMessage.address && (
                        <>
                            <p style={{ alignSelf: 'flex-start' }}>
                                <b>Requested service at: </b>
                            </p>
                            <p>
                                &nbsp;<b>Street: </b>
                                {selectedMessage.address.street}
                            </p>
                            <p>
                                &nbsp; <b>City: </b>{' '}
                                {selectedMessage.address.city}
                            </p>
                            <p>
                                &nbsp; <b>Zip Code: </b>
                                {selectedMessage.address.zipCode}
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className={style.Container}>
                {selectedMessage.userMessage
                    ? selectedMessage.userMessage
                    : 'No message'}
            </div>
            <hr />

            <div className={style.Container}>
                <p>
                    <b>Attached:</b>
                </p>
                <div className={style.ImgContainer}>
                    <img src={selectedMessage.imageUrl} alt="pet-pic" />
                </div>
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
