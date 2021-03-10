import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './PetDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../utils/utility';
import EditPet from '../EditPet/EditPet';

const PetDetails = (props) => {
    const [error, setError] = useState(null);
    const [editForm, setEditForm] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const [selectedPet, setSelectedPet] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios
            .get(`/api/pets/${props.match.params.id}`)
            .then((response) => {
                console.log('response from DB', response.data);

                setSelectedPet(
                    updateObject({
                        _id: response.data.pet._id,
                        name: response.data.pet.name,
                        specie: response.data.pet.specie,
                        breed: response.data.pet.breed,
                        age: response.data.pet.age,
                        diagnosis: response.data.pet.diagnosis,
                        treatment: response.data.pet.treatment,
                        owner: {
                            name: response.data.owner.name,
                            lastName: response.data.owner.lastName,
                            email: response.data.owner.email,
                            address: response.data.owner.address,
                            phoneNumber: response.data.owner.phoneNumber,
                        },
                    })
                );

                // setSelectedPet(updateObject((selectedPet[index], {value: response.data[index]}))

                // for (let formControl in selectedPet) {
                //     setSelectedPet({
                //         ...selectedPet,
                //         formControl: {
                //             ...formControl,
                //             value: response.data[formControl],
                //         },
                //     });
                // }
            })

            .catch((err) => {
                console.log(err.response);
                if (err.response.status === 404) {
                    setError({
                        error: 'Pet not found',
                    });
                }
            });
    };
    console.log('selectedPet', selectedPet);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log('name, value', name, value);

        setSelectedPet({
            ...selectedPet,
            [name]: value,
            address: {
                [name]: value,
            },
        });

        // const updatedFormElement = updateObject(selectedPet[inputId], {
        //     value: event.target.value,
        //     valid: checkValidity(
        //         event.target.value,
        //         selectedPet[inputId].validation
        //     ),
        //     touched: true, // input in the form has changed
        // });
        // const updatedForm = updateObject(selectedPet, {
        //     [inputId]: updatedFormElement,
        // });

        // let validForm = true;
        // for (let inputId in updatedForm) {
        //     validForm = updatedForm[inputId].valid && validForm;
        // }
        // setSelectedPet(updatedForm);
        // setFormIsValid(validForm);
    };

    console.log('selectedPet', selectedPet);

    const toggleEditForm = () => {
        setEditForm(() => !editForm);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('update');
        axios
            .put(`/api/pets/${selectedPet._id}`, {
                name: selectedPet.name,
                specie: selectedPet.specie,
                breed: selectedPet.breed,
                age: selectedPet.age,
                diagnosis: selectedPet.diagnosis,
                treatment: selectedPet.treatment,
            })
            .then((response) => {
                props.history.goBack();

                fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deletePet = async () => {
        await axios
            .delete(`/api/pets/${selectedPet._id}`)
            .then(() => {
                console.log(
                    `${selectedPet.name} ${selectedPet.lastName} was successfully removed`
                );
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!selectedPet) return <Spinner />;
    return (
        <>
            {editForm ? (
                <EditPet
                    toggleEditForm={toggleEditForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    selectedPet={selectedPet}
                />
            ) : (
                <div className={style.Card}>
                    <h3>{selectedPet.name}</h3>
                    <div className={style.Infos}>
                        <div style={{ width: '100%' }}>
                            <p>Specie: {selectedPet.specie}</p>
                            <p>Breed: {selectedPet.breed}</p>
                            <p>Age: {selectedPet.age}</p>
                            <hr />
                            <p>Diagnosis: {selectedPet.diagnosis}</p>
                            <p>Treatment: {selectedPet.treatment}</p>
                            <hr />
                        </div>
                        <div style={{ width: '100%', height: '50%' }}>
                            <p>Owner: </p>
                            <p>&nbsp; Name: {selectedPet.owner.name}</p>
                            <p>
                                &nbsp; Last name: {selectedPet.owner.lastName}
                            </p>
                            <hr />
                            <p>&nbsp; @: {selectedPet.owner.email}</p>
                            <p>
                                &nbsp; Phone Num:{' '}
                                {selectedPet.owner.phoneNumber}
                            </p>
                            <hr />
                            <p>
                                &nbsp; Street:{' '}
                                {selectedPet.owner.address.street}
                            </p>
                            <p>&nbsp; City: {selectedPet.owner.address.city}</p>
                            <p>
                                &nbsp; ZIP code:{' '}
                                {selectedPet.owner.address.zipCode}
                            </p>
                            <p>
                                &nbsp; State: {selectedPet.owner.address.state}
                            </p>
                        </div>
                    </div>
                    <div className={style.buttons}>
                        <div>
                            <button onClick={() => props.history.goBack()}>
                                Back
                            </button>
                        </div>
                        <div style={{ display: 'flex', marginRight: '5%' }}>
                            <button onClick={toggleEditForm}>Edit</button>
                            <button onClick={deletePet}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PetDetails;
