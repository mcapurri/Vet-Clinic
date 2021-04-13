import React, { useState, useEffect } from 'react';
import style from './MessagesList.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '../../Filters/Filters';
import Spinner from '../../UI/Spinner/Spinner';
// import NotifyMe from 'react-notification-timeline';

const MessagesList = () => {
    const [messagesList, setMessagesList] = useState([]);
    const [searchField, setSearchField] = useState('');

    const fetchData = () => {
        axios
            .get('/api/messages')
            .then((messages) => {
                setMessagesList(messages.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // console.log('messagesList', messagesList);

    const handleChange = (event) => {
        console.log('event target', event.target);

        setSearchField(event.target.value);
    };

    const filteredSearch = messagesList.filter((element) => {
        return (
            `${element.sender.name}`
                .toLowerCase()
                .includes(`${searchField.toLowerCase()}`) ||
            `${element.sender.lastName}`
                .toLowerCase()
                .includes(`${searchField.toLowerCase()}`)
        );
    });

    const displayMessages = filteredSearch.map((message) => {
        return (
            <tr key={message._id} className={style.resultCard}>
                <td style={{ width: '30%' }}>
                    {message.sender.lastName},{message.sender.name}
                </td>
                <td>
                    <Link to={`/messages/${message._id}`}>
                        {' '}
                        {message.address ? 'new request' : 'message'}
                    </Link>
                </td>

                <td>
                    {message.imageUrl && (
                        <img
                            src="../../../images/camera-logo.png"
                            alt="pic-logo"
                            style={{
                                width: '1.5rem',
                            }}
                        />
                    )}
                </td>
            </tr>
        );
    });

    if (!messagesList) return <Spinner />;
    return (
        <div className={style.Container}>
            <Filters handleChange={handleChange} />
            {/* <NotifyMe
                data={messagesList}
                storageKey="notific_key"
                notific_key="timestamp"
                notific_value="update"
                // heading="Notification Alerts"
                sortedByKey={false}
                showDate={true}
                size={64}
                color="yellow"
                // markAsReadFn={() =>
                //     yourOwnFunctionHandler()
                // }
            /> */}

            <table style={{ margin: '0 0 10% 5%' }}>
                <tbody>{displayMessages}</tbody>
            </table>
        </div>
    );
};

export default MessagesList;
