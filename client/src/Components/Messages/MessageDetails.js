import React, { useState, useEffect } from 'react';
import style from './MessageDetails.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';

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
            <h6>New message</h6>
            <div style={{ width: '100%' }}>
                <p>
                    from: {selectedMessage.sender.name}{' '}
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
                <p>Received on {selectedMessage.createdAt}</p>
                <hr />
                {selectedMessage?.userMessage}
            </div>
            <div className={style.Infos}>
                <div style={{ width: '100%' }}>
                    {selectedMessage.address && (
                        <>
                            <p>Requested service at: </p>
                            <p>
                                &nbsp; Street: {selectedMessage.address.street}
                            </p>
                            <p>&nbsp; City: {selectedMessage.address.city}</p>
                            <p>
                                &nbsp; ZIP Code:
                                {selectedMessage.address.zipCode}
                            </p>
                        </>
                    )}

                    <hr />

                    <hr />
                </div>
                {/* <div style={{ width: '100%' }}>
                    <p>Pets: </p>
                    <ul>
                        {selectedMessage.pets.map((pet) => {
                            return (
                                <Link to={`/pets/${pet._id}`}>
                                    <li>
                                        <h6>{pet.name}</h6>
                                        <br />
                                        {pet.specie}
                                        <br />
                                        {pet.breed}
                                        <br />
                                    </li>
                                </Link>
                            );
                        })}
                    </ul>
                </div> */}
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
