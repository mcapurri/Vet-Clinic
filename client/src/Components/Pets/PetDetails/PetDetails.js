import React, { useState, useEffect } from 'react';
import style from './PetDetails.module.css';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';
import { updateObject } from '../../../utils/utility';
import EditPet from '../EditPet/EditPet';

const PetDetails = (props) => {
    const [editForm, setEditForm] = useState(false);

    const [petId] = useState(props.match.params.id);
    const [specie, setSpecie] = useState('');
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [owner, setOwner] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: {},
        phoneNumber: '',
    });
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');

    const fetchData = async () => {
        try {
            const pet = await axios.get(`/api/pets/${props.match.params.id}`);
            setName(pet.data.pet.name);
            setSpecie(pet.data.pet.specie);
            setBreed(pet.data.pet.breed);
            setAge(pet.data.pet.age);
            setOwner({
                name: pet.data.owner.name,
                lastName: pet.data.owner.lastName,
                email: pet.data.owner.email,
                address: pet.data.owner.address,
                phoneNumber: pet.data.owner.phoneNumber,
            });
            setDiagnosis(pet.data.pet.diagnosis);
            setTreatment(pet.data.pet.treatment);
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
            case 'name':
                setName(value);
                break;
            case 'specie':
                setSpecie(value);
                break;
            case 'breed':
                setBreed(value);
                break;
            case 'age':
                setAge(value);
                break;

            case 'diagnosis':
                setDiagnosis(value);
                break;
            case 'treatment':
                setTreatment(value);
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
            .put(`/api/pets/${petId}`, {
                name,
                specie,
                breed,
                age,
                diagnosis,
                treatment,
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
            .delete(`/api/pets/${petId}`)
            .then(() => {
                console.log(`patient ${name} was successfully removed`);
                props.history.goBack();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (!name) return <Spinner />;
    return (
        <>
            {editForm ? (
                <EditPet
                    toggleEditForm={toggleEditForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    name={name}
                    specie={specie}
                    breed={breed}
                    age={age}
                    diagnosis={diagnosis}
                    treatment={treatment}
                />
            ) : (
                <div className={style.Card}>
                    <h3>{name}</h3>
                    <div className={style.Infos}>
                        <div style={{ width: '100%' }}>
                            <p>
                                <b>Specie:</b> {specie}
                            </p>
                            <p>
                                <b>Breed:</b> {breed}
                            </p>
                            <p>
                                {' '}
                                <b>Age:</b> {age}
                            </p>
                            <hr />
                            <p>
                                {' '}
                                <b>Diagnosis:</b>{' '}
                            </p>
                            <div className={style.TextBox}>
                                <p>{diagnosis}</p>
                            </div>
                            <p>
                                {' '}
                                <b>Treatment:</b>{' '}
                            </p>
                            <div className={style.TextBox}>
                                <p>{treatment}</p>
                            </div>
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                paddingLeft: '10%',
                            }}
                        >
                            <p>
                                <b>Owner:</b>{' '}
                            </p>
                            <div>
                                <p>
                                    &nbsp; <b>Name: </b> {owner.name}
                                </p>
                                <p>
                                    &nbsp; <b>Last name: </b> {owner.lastName}
                                </p>
                                <hr />
                                <p>
                                    &nbsp;{' '}
                                    <b>
                                        <img
                                            src="../../../../images/email-logo.png"
                                            alt="phone-logo"
                                            style={{
                                                width: '1.2rem',
                                                marginRight: '5%',
                                            }}
                                        />{' '}
                                    </b>
                                    {owner.email}
                                </p>
                                <p>
                                    &nbsp;{' '}
                                    <b>
                                        <img
                                            src="../../../../images/phone-logo.png"
                                            alt="phone-logo"
                                            style={{
                                                width: '1.2rem',
                                                marginRight: '5%',
                                            }}
                                        />
                                    </b>
                                    {owner.phoneNumber}
                                </p>
                            </div>

                            <hr />
                            <div
                                style={{
                                    height: '50%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <p>
                                    &nbsp; <b>Street: </b>{' '}
                                    {owner.address.street}
                                </p>
                                <p>
                                    &nbsp; <b>City: </b> {owner.address.city}
                                </p>
                                <p>
                                    &nbsp; <b>Zip code: </b>{' '}
                                    {owner.address.zipCode}
                                </p>
                            </div>
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
                                width: ' 200px',
                                justifyContent: 'space-around',
                            }}
                        >
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
