import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './UserDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import EditUser from '../EditUser/EditUser';

const UserDetails = (props) => {
    const [error, setError] = useState(null);
    const [editForm, setEditForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(
        // {
        //     name: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'First name',
        //         },
        //         value: '',
        //         validation: {
        //             required: true,
        //             minLength: 2,
        //         },
        //         valid: false,
        //         touched: false,
        //     },
        //     lastName: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'Last name',
        //         },
        //         value: '',
        //         validation: {
        //             required: true,
        //             minLength: 2,
        //         },
        //         valid: false,
        //         touched: false,
        //     },
        //     email: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'email',
        //             placeholder: 'Email',
        //         },
        //         value: '',
        //         validation: {
        //             required: true,
        //             isEmail: true,
        //             unique: true, /// you still have to write the code for this validation
        //         },
        //         valid: false,
        //         touched: false,
        //     },
        //     street: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'Street',
        //         },
        //         value: '',
        //         validation: {
        //             // required: true,
        //         },
        //         valid: false,
        //         touched: false,
        //     },
        //     zipCode: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'ZIP Code',
        //         },
        //         value: '',
        //         validation: {
        //             // required: true,
        //             minLength: 5,
        //             maxLength: 5,
        //         },
        //         valid: false,
        //         touched: false,
        //     },
        //     city: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'City',
        //         },
        //         value: '',
        //         validation: {
        //             // required: true,
        //         },
        //         valid: false,
        //         touched: false,
        //     },
        //     state: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'State',
        //         },
        //         value: '',
        //         validation: {
        //             // required: true,
        //         },
        //         valid: false,
        //         touched: false,
        //     },
        //     phoneNumber: {
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: 'Phone Num.',
        //         },
        //         value: '',
        //         validation: {
        //             // required: true,
        //         },
        //         valid: false,
        //         touched: false,
        //     },
        //     role: {
        //         elementType: 'select',
        //         elementConfig: {
        //             options: [
        //                 { value: 'employee', displayValue: 'employee' },
        //                 { value: 'client', displayValue: 'client' },
        //             ],
        //         },
        //         value: '',
        //         validation: {},
        //         valid: true,
        //     },
        // } || ''

        ''
    );

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

    const toggleEditForm = () => {
        setEditForm(() => !editForm);
    };
    console.log('editForm', editForm);

    const handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('update');
        axios
            .put(`/api/users/${selectedUser._id}`, {
                name: selectedUser.name,
                lastName: selectedUser.lastName,
                email: selectedUser.email,
                street: selectedUser.street,
                zipCode: selectedUser.zipCode,
                city: selectedUser.city,
                state: selectedUser.state,
                phoneNumber: selectedUser.phoneNumber,
            })
            .then((response) => {
                setSelectedUser(() => response.data);
                // this.getData(); / with some changes
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!selectedUser) return <Spinner />;
    return (
        <div className={style.Card}>
            {!editForm ? (
                <>
                    <h3>
                        {selectedUser.name} {selectedUser.lastName}
                    </h3>
                    <div className={style.Infos}>
                        <div>
                            <p>Address: </p>
                            <p>&nbsp; Street: {selectedUser.street}</p>
                            <p>&nbsp; ZIP Code: {selectedUser.zipCode}</p>
                            <p>&nbsp; City: {selectedUser.city}</p>
                            <p>&nbsp; State: {selectedUser.state}</p>
                            <hr />
                            <p>E-mail: {selectedUser.email}</p>
                            <p>Phone num.: {selectedUser.phoneNumber}</p>
                            <hr />
                            {selectedUser.position && (
                                <p>Position: {selectedUser.position}</p>
                            )}
                            <p>
                                {selectedUser.role} since:
                                {selectedUser.createdAt}
                            </p>
                        </div>
                        <div>
                            <p>Pets: </p>
                            <ul>
                                {selectedUser.pets.map((pet) => {
                                    return (
                                        <li>
                                            Name: {pet.name}&nbsp; Specie:{' '}
                                            {pet.specie}
                                            &nbsp; Breed: {pet.breed}&nbsp; Age:
                                            {pet.age}
                                        </li>
                                    );
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
                            <button onClick={toggleEditForm}>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </>
            ) : (
                <EditUser
                    toggleEditForm={toggleEditForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    selectedUser={selectedUser}
                />
            )}
        </div>
    );
};

export default UserDetails;
