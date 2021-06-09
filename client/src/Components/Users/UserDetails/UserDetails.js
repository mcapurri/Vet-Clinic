import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './UserDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import EditUser from '../EditUser/EditUser';

const UserDetails = (props) => {
    const [editForm, setEditForm] = useState(false);
    const [userId] = useState(props.match.params.id);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [pets, setPets] = useState([]);
    const [role, setRole] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const user = await axios.get(`/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log('user', user.data.user);
            setFirstName(user.data.user.name);
            setLastName(user.data.user.lastName);
            setEmail(user.data.user.email);
            setPhoneNumber(user.data.user.phoneNumber);
            setStreet(user.data.user.address.street);
            setZipCode(user.data.user.address.zipCode);
            setCity(user.data.user.address.city);
            setPets(user.data.pets);
            setRole(user.data.user.role);
            setCreatedAt(user.data.user.createdAt);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log('name, value', name, value);
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'street':
                setStreet(value);
                break;
            case 'zipCode':
                setZipCode(value);
                break;
            case 'city':
                setCity(value);
                break;
        }
    };

    const toggleEditForm = () => {
        setEditForm(() => !editForm);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('update');
        axios
            .put(`/api/users/${userId}`, {
                firstName,
                lastName,
                email,
                street,
                zipCode,
                city,
                phoneNumber,
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
            .delete(`/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                console.log(
                    `${firstName} ${lastName} was successfully removed`
                );
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!lastName) return <Spinner />;
    return (
        <div className={style.Container}>
            {editForm ? (
                <EditUser
                    toggleEditForm={toggleEditForm}
                    handleSubmit={handleSubmit}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phoneNumber={phoneNumber}
                    street={street}
                    zipCode={zipCode}
                    city={city}
                    handleChange={handleChange}
                />
            ) : (
                // <>
                <div className={style.Card}>
                    <h3 style={{ fontWeight: 'bold' }}>
                        {firstName} {lastName}
                    </h3>
                    <div className={style.AddButton}>
                        {!props.isEmployee ? (
                            <Link to="/pets/add">
                                <span style={{ fontSize: 'bold' }}>+</span>
                                <span>pet</span>
                            </Link>
                        ) : (
                            <Link to={`/users/${userId}/pet`}>
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
                        <div style={{ width: '50%' }}>
                            <p>
                                {' '}
                                <b>Address:</b>{' '}
                            </p>
                            <p>
                                &nbsp; <b>Street: </b> {street}
                            </p>
                            <p>
                                &nbsp; <b>Zip Code: </b>
                                {zipCode}
                            </p>
                            <p>
                                &nbsp; <b>City:</b> {city}
                            </p>

                            <hr />
                            <p>
                                <img
                                    src="../../../../images/email-logo.png"
                                    alt="email-logo"
                                    style={{
                                        width: '1.2rem',
                                        marginRight: '5%',
                                    }}
                                />
                                {email}
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
                                {phoneNumber}
                            </p>
                            <hr />
                            {/* {position && (
                                <p>
                                    <b>Position:</b> {position}
                                </p>
                            )} */}
                            <p>
                                <b>
                                    {role} since: <br />
                                </b>
                                {createdAt.substring(0, 10)}
                            </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p>
                                <b>Pets: </b>
                            </p>
                            <ul>
                                {pets?.map((pet) => {
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
        </div>
    );
};

export default UserDetails;
