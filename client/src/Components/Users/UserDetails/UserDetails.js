import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './UserDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../utils/utility';
import EditUser from '../EditUser/EditUser';

const UserDetails = (props) => {
    console.log('UserDetails props', props);
    const [error, setError] = useState(null);
    const [editForm, setEditForm] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const [selectedUserForm, setSelectedUserForm] = useState(
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

                setSelectedUserForm(
                    updateObject(response.data.user, {
                        pets: response.data.pets,
                    })
                );

                // setSelectedUserForm({
                //     ...selectedUserForm,
                //     owner: {
                //         ...form.owner,
                //         elementConfig: {
                //             ...form.elementConfig,
                //             options: users.data,
                //         },
                //     },
                // });
                // for (let formControl in selectedUserForm) {
                //     setSelectedUserForm(
                //         updateObject({
                //             ...selectedUserForm,
                //             formControl: {
                //                 ...formControl,
                //                 value: response.data[formControl],
                //             },
                //         })
                //     );
                // }
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
    console.log('selectedUserForm', selectedUserForm);

    const handleChange = (event) => {
        // console.log('inputId', inputId);
        const { name, value } = event.target;
        console.log('name, value', name, value);

        setSelectedUserForm({
            ...selectedUserForm,
            [name]: value,
            address: {
                ...selectedUserForm.address,
                [name]: value,
            },
        });
        // const updatedFormElement = updateObject(selectedUserForm[inputId], {
        //     value: event.target.value,
        //     valid: checkValidity(
        //         event.target.value,
        //         selectedUserForm[inputId].validation
        //     ),
        //     touched: true, // input in the form has changed
        // });
        // const updatedForm = updateObject(selectedUserForm, {
        //     [inputId]: updatedFormElement,
        // });

        // let validForm = true;
        // for (let inputId in updatedForm) {
        //     validForm = updatedForm[inputId].valid && validForm;
        // }
        // setSelectedUserForm(updatedForm);
        // setFormIsValid(validForm);
    };

    console.log('selectedUserForm', selectedUserForm);

    const toggleEditForm = () => {
        setEditForm(() => !editForm);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('update');
        axios
            .put(`/api/users/${selectedUserForm._id}`, {
                name: selectedUserForm.name,
                lastName: selectedUserForm.lastName,
                email: selectedUserForm.email,
                street: selectedUserForm.address.street,
                zipCode: selectedUserForm.address.zipCode,
                city: selectedUserForm.address.city,
                state: selectedUserForm.address.state,
                phoneNumber: selectedUserForm.phoneNumber,
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
            .delete(`/api/users/${selectedUserForm._id}`)
            .then(() => {
                console.log(
                    `${selectedUserForm.name} ${selectedUserForm.lastName} was successfully removed`
                );
                props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!selectedUserForm) return <Spinner />;
    return (
        <>
            {editForm ? (
                <EditUser
                    toggleEditForm={toggleEditForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    selectedUserForm={selectedUserForm}
                />
            ) : (
                // <>
                <div className={style.Card}>
                    <h3>
                        {selectedUserForm.name} {selectedUserForm.lastName}
                    </h3>
                    <div>
                        {!props.isEmployee ? (
                            <Link to="/pets/add">
                                <span style={{ fontSize: 'bold' }}>+</span>
                                <span>pet</span>
                            </Link>
                        ) : (
                            <Link to={`/users/${selectedUserForm._id}/pet`}>
                                <span style={{ fontSize: 'bold' }}>+</span>
                                <span>pet</span>
                            </Link>
                        )}
                    </div>
                    <div className={style.Infos}>
                        <div style={{ width: '100%' }}>
                            <p>Address: </p>
                            <p>
                                &nbsp; Street: {selectedUserForm.address.street}
                            </p>
                            <p>
                                &nbsp; ZIP Code:{' '}
                                {selectedUserForm.address.zipCode}
                            </p>
                            <p>&nbsp; City: {selectedUserForm.address.city}</p>
                            <p>
                                &nbsp; State: {selectedUserForm.address.state}
                            </p>
                            <hr />
                            <p>
                                {' '}
                                <img
                                    src="../../../../images/email-logo.png"
                                    alt="phone-logo"
                                    style={{
                                        width: '1.2rem',
                                        marginRight: '5%',
                                    }}
                                />{' '}
                                {selectedUserForm.email}
                            </p>
                            <p>
                                {' '}
                                <img
                                    src="../../../../images/phone-logo.png"
                                    alt="phone-logo"
                                    style={{
                                        width: '1.2rem',
                                        marginRight: '7%',
                                    }}
                                />{' '}
                                {selectedUserForm.phoneNumber}
                            </p>
                            <hr />
                            {selectedUserForm.position && (
                                <p>Position: {selectedUserForm.position}</p>
                            )}
                            <p>
                                {selectedUserForm.role} since: <br />
                                {selectedUserForm.createdAt}
                            </p>
                        </div>
                        <div style={{ width: '100%' }}>
                            <p>Pets: </p>
                            <ul>
                                {selectedUserForm.pets.map((pet) => {
                                    return (
                                        <Link to={`/pets/${pet._id}`}>
                                            <li>
                                                {pet.name}
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
                        {/* <div>
                            {!props.isEmployee ? (
                                <Link to="/pets/add">
                                    <span style={{ fontSize: 'bold' }}>+</span>
                                    <span>pet</span>
                                </Link>
                            ) : (
                                <Link to={`/users/${selectedUserForm._id}/pet`}>
                                    <span style={{ fontSize: 'bold' }}>+</span>
                                    <span>pet</span>
                                </Link>
                            )}
                        </div> */}
                        <div>
                            <button onClick={() => props.history.goBack()}>
                                Back
                            </button>
                        </div>
                        <div style={{ display: 'flex', marginRight: '5%' }}>
                            <button onClick={toggleEditForm}>Edit</button>
                            {/* <Link to={`/users/${selectedUserForm._id}/edit`}>Edit</Link> */}
                            <button onClick={deleteUser}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserDetails;
