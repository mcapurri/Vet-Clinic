import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './UserDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../utils/utility';
import EditUser from '../EditUser/EditUser';

const UserDetails = (props) => {
    const [error, setError] = useState(null);
    const [editForm, setEditForm] = useState(false);
    // const [formIsValid, setFormIsValid] = useState(false);

    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios
            .get(`/api/users/${props.match.params.id}`)
            .then((response) => {
                setSelectedUser(
                    updateObject(response.data.user, {
                        pets: response.data.pets,
                    })
                );
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
    // console.log('selectedUser', selectedUser);

    const handleChange = (event) => {
        // console.log('inputId', inputId);
        const { name, value } = event.target;
        console.log('name, value', name, value);

        setSelectedUser({
            ...selectedUser,
            [name]: value,
            address: {
                ...selectedUser.address,
                [name]: value,
            },
        });
    };

    const toggleEditForm = () => {
        setEditForm(() => !editForm);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('update');
        axios
            .put(`/api/users/${selectedUser._id}`, {
                name: selectedUser.name,
                lastName: selectedUser.lastName,
                email: selectedUser.email,
                street: selectedUser.address.street,
                zipCode: selectedUser.address.zipCode,
                city: selectedUser.address.city,
                state: selectedUser.address.state,
                phoneNumber: selectedUser.phoneNumber,
            })
            .then((response) => {
                props.history.goBack();

                // fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteUser = async () => {
        await axios
            .delete(`/api/users/${selectedUser._id}`)
            .then(() => {
                console.log(
                    `${selectedUser.name} ${selectedUser.lastName} was successfully removed`
                );
                props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!selectedUser) return <Spinner />;
    return (
        <>
            {editForm ? (
                <EditUser
                    toggleEditForm={toggleEditForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    selectedUser={selectedUser}
                />
            ) : (
                // <>
                <div className={style.Card}>
                    <h3>
                        {selectedUser.name} {selectedUser.lastName}
                    </h3>
                    <div className={style.AddButton}>
                        {!props.isEmployee ? (
                            <Link to="/pets/add">
                                <span style={{ fontSize: 'bold' }}>+</span>
                                <span>pet</span>
                            </Link>
                        ) : (
                            <Link to={`/users/${selectedUser._id}/pet`}>
                                <span
                                    style={{
                                        fontSize: 'bold',
                                        marginRight: '5%',
                                    }}
                                >
                                    +
                                </span>
                                <span>pet</span>
                            </Link>
                        )}
                    </div>
                    <div className={style.Infos}>
                        <div style={{ width: '100%' }}>
                            <p>
                                {' '}
                                <b>Address:</b>{' '}
                            </p>
                            <p>
                                &nbsp; <b>Street: </b>{' '}
                                {selectedUser.address.street}
                            </p>
                            <p>
                                &nbsp; <b>Zip Code: </b>
                                {selectedUser.address.zipCode}
                            </p>
                            <p>
                                &nbsp; <b>City:</b> {selectedUser.address.city}
                            </p>

                            <hr />
                            <p>
                                <img
                                    src="../../../../images/email-logo.png"
                                    alt="phone-logo"
                                    style={{
                                        width: '1.2rem',
                                        marginRight: '5%',
                                    }}
                                />
                                {selectedUser.email}
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
                                {selectedUser.phoneNumber}
                            </p>
                            <hr />
                            {selectedUser.position && (
                                <p>
                                    <b>Position:</b> {selectedUser.position}
                                </p>
                            )}
                            <p>
                                <b>
                                    {selectedUser.role} since: <br />
                                </b>
                                {selectedUser.createdAt}
                            </p>
                        </div>
                        <div style={{ width: '100%', paddingLeft: '5%' }}>
                            <p>
                                <b>Pets: </b>
                            </p>
                            <ul>
                                {selectedUser.pets.map((pet) => {
                                    return (
                                        <Link
                                            to={`/pets/${pet._id}`}
                                            key={pet._id}
                                        >
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
                        </div>
                    </div>

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
                            <button onClick={toggleEditForm}>Edit</button>
                            <button onClick={deleteUser}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserDetails;
