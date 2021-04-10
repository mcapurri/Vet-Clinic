import React, { useState, useEffect } from 'react';
import style from './Requests.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import Spinner from '../UI/Spinner/Spinner';

const Requests = () => {
    const [requestsList, setRequestsList] = useState([]);
    const [searchField, setSearchField] = useState('');

    const fetchData = () => {
        axios
            .get('/api/requests')
            .then((requests) => {
                setRequestsList(requests.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // console.log('requestsList', requestsList);

    const handleChange = (event) => {
        console.log('event target', event.target);

        setSearchField(event.target.value);
    };

    const filteredSearch = requestsList.filter((element) => {
        return (
            `${element.sender.name}`
                .toLowerCase()
                .includes(`${searchField.toLowerCase()}`) ||
            `${element.sender.lastName}`
                .toLowerCase()
                .includes(`${searchField.toLowerCase()}`)
        );
    });

    const displayMessages = filteredSearch.map((request) => {
        return (
            <tr key={request._id} className={style.resultCard}>
                <td style={{ width: '30%' }}>
                    {request.sender.lastName},{request.sender.name}
                </td>
                <td>
                    <Link to={`/requests/${request._id}`}>
                        {' '}
                        {request.address ? 'new request' : 'message'}
                    </Link>
                </td>

                <td>
                    {request.imageUrl && (
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

    if (!requestsList) return <Spinner />;
    return (
        <div className={style.Container}>
            <Filters handleChange={handleChange} />

            <table style={{ margin: '0 0 10% 5%' }}>
                <tbody>{displayMessages}</tbody>
            </table>
        </div>
    );
};

export default Requests;
