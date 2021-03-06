import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './UserDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';

const UserDetails = (props) => {
    console.log('props UserDetails', props);
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
    if (!selectedUser) return <Spinner />;
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
                    <p>E-mail: {selectedUser.email}</p>
                    <p>Phone num.: {selectedUser.phoneNumber}</p>
                    <hr />
                    {selectedUser.position && (
                        <p>Position: {selectedUser.position}</p>
                    )}
                    <p>
                        {selectedUser.role} since: {selectedUser.createdAt}
                    </p>
                </div>
                <div>
                    <p>Pets: </p>
                    <ul>
                        {selectedUser.pets.map((pet) => {
                            <li>
                                Name: {pet.name}&nbsp; Specie: {pet.specie}
                                &nbsp; Breed: {pet.breed}&nbsp; Age: {pet.age}
                            </li>;
                        })}
                    </ul>
                </div>
            </div>
            <div className={style.buttons}>
                <div>
                    {props.isEmployee ? (
                        <Link to="/pets/add">
                            <span style={{ fontSize: 'bold' }}>+</span>
                            <span>pet</span>
                        </Link>
                    ) : (
                        <Link to={`/users/${selectedUser._id}/pet`}>
                            <span style={{ fontSize: 'bold' }}>+</span>
                            <span>pet</span>
                        </Link>
                    )}
                </div>
                <div style={{ display: 'flex', marginRight: '5%' }}>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
