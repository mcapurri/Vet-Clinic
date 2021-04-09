import React, { useState, useEffect } from 'react';
import style from './Requests.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import Spinner from '../UI/Spinner/Spinner';

const Requests = () => {
    const [contactsList, setContactsList] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [isAppointment, setIsAppointment] = useState(true);
    const [isRequest, setIsRequest] = useState(true);

    const fetchData = () => {
        axios
            .get('/api/contacts')
            .then((contacts) => {
                setContactsList(contacts.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // console.log('contactsList', contactsList);

    const handleChange = (event) => {
        console.log('event target', event.target);
        if (event.target.type === 'checkbox') {
            if (event.target.name === 'appointment') {
                setIsAppointment(() => !isAppointment);
            } else if (event.target.name === 'request') {
                setIsRequest(() => !isRequest);
            } else {
                setSearchField(event.target.value);
            }
        }
    };

    const filteredSearch = contactsList.filter((element) => {
        return (
            ((isAppointment && element.homeService === false) ||
                (isRequest && element.homeService === true)) &&
            (`${element.sender.name}`
                .toLowerCase()
                .includes(`${searchField.toLowerCase()}`) ||
                `${element.sender.lastName}`
                    .toLowerCase()
                    .includes(`${searchField.toLowerCase()}`))
        );
    });
    // console.log('filteredSearch', filteredSearch);

    const displayUsers = filteredSearch.map((contact) => {
        return (
            <tr key={contact._id} className={style.resultCard}>
                <td style={{ width: '30%' }}>
                    {contact.sender.lastName},{contact.sender.name}
                </td>
                <td>
                    <Link to={`/contacts/${contact._id}`}>
                        {contact.homeService ? 'Request' : 'Appointment'}
                    </Link>
                </td>

                <td>
                    {contact.imageUrl && (
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

    if (!contactsList) return <Spinner />;
    return (
        <div className={style.Container}>
            <Filters
                handleChange={handleChange}
                isAppointment={isAppointment}
                isRequest={isRequest}
            />
            <button className={style.Button}>
                <Link to={'/contacts/new'}>
                    <span>+</span>
                </Link>
            </button>

            <table style={{ margin: '0 0 10% 5%' }}>
                <tbody>{displayUsers}</tbody>
            </table>
        </div>
    );
};

export default Requests;
