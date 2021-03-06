import React, { useState, useEffect } from 'react';
import style from './UserDetails.module.css';
import axios from 'axios';

const UserDetails = (props) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios
            .get(`/api/users/${props.match.params.id}`)
            .then((response) => {
                console.log('response from DB', response.data);

                setSelectedUser(() => response.data);
            })
            .catch((err) => {
                console.log(err.response);
                if (err.response.status === 404) {
                    setError({
                        error: 'User not found',
                    });
                }
            });
    };
    console.log('selectedUser', selectedUser);
    if (!selectedUser) return <h3>Loading...</h3>;
    return (
        <div className={style.Card}>
            <h3>
                {selectedUser.name} {selectedUser.lastName}
            </h3>
            <div className={style.Infos}>
                <div>
                    <p>Address: </p>
                    <p>&nbsp; Street: {selectedUser.address.street}</p>
                    <p>&nbsp; ZIP Code: {selectedUser.address.zipCode}</p>
                    <p>&nbsp; City: {selectedUser.address.city}</p>
                    <p>&nbsp; State: {selectedUser.address.state}</p>
                    <hr />
                    <p>Email: {selectedUser.email}</p>
                    <p>Phone num.: {selectedUser.phoneNumber}</p>
                    <hr />
                </div>
                <div>
                    <p>Pets: </p>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
