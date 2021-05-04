import React, { useState, useEffect } from 'react';
import style from './AddPet.module.css';

import useInput from '../../../utils/useInput';
import { useForm } from 'react-hook-form';

import { Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

const token = localStorage.getItem('token');

const AddPet = (props) => {
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [specie, setSpecie] = useInput('');
    const [name, setName] = useInput('');
    const [breed, setBreed] = useInput('');
    const [age, setAge] = useInput('');
    const [owner, setOwner] = useInput('');
    const [diagnosis, setDiagnosis] = useInput('');
    const [treatment, setTreatment] = useInput('');
    const [ownersList, setOwnersList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const owners = await axios.get('/api/users/owners', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('owners', owners.data);

            const options = owners.data.map((owner) => {
                return (
                    <option key={owner.value} value={owner.value}>
                        {owner.displayValue}
                    </option>
                );
            });

            setOwnersList(options);
        } catch (err) {
            console.log(err);
        }
    };

    //Set dinamically url according to role and history url
    let url;
    let profileOwner;

    props.location.pathname !== '/pets/add'
        ? (url = `/api/users/${props.location.pathname
              .split('/')[2]
              .toString()}/pet`) &&
          (profileOwner = props.location.pathname.split('/')[2].toString())
        : (url = '/api/pets/add') && (profileOwner = owner);

    console.log('profileOwner', profileOwner);
    console.log('url', url);

    const onSubmit = async (data) => {
        const user = await axios.post(
            url,
            { ...data, owner: profileOwner },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (user.message) {
            setMessage(user.msg);

            // Reset input values
            setSpecie('');
            setName('');
            setBreed('');
            setAge('');
            setDiagnosis('');
            setTreatment('');
            setOwner('');
        } else {
            // console.log('user added', user);
            props.history.goBack();
        }
    };

    return (
        <div>
            <Form className={style.Form} onSubmit={handleSubmit(onSubmit)}>
                <h3>Add pet</h3>

                <Form.Group>
                    <FormControl
                        as="select"
                        {...register('specie', { required: true })}
                        name="specie"
                        value={specie}
                        onChange={setSpecie}
                    >
                        <option value="">--Choose one--</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="rodent">Rodent</option>
                        <option value="reptile">Reptile</option>
                        <option value="other">Other</option>
                    </FormControl>
                    {errors.specie && <span>This field is required</span>}
                </Form.Group>

                <Form.Group>
                    <FormControl
                        {...register('name', {
                            required: true,
                            minLength: 2,
                        })}
                        placeholder="Name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={setName}
                    />
                    {errors.name && <span>This field is required</span>}
                </Form.Group>

                <Form.Group>
                    <FormControl
                        {...register('breed', {
                            required: true,
                            minLength: 2,
                        })}
                        placeholder="Breed"
                        name="breed"
                        type="text"
                        value={breed}
                        onChange={setBreed}
                    />
                    {errors.breed && <span>This field is required</span>}
                </Form.Group>

                <Form.Group>
                    <FormControl
                        {...register('age', { required: true })}
                        placeholder="Age"
                        name="age"
                        type="text"
                        value={age}
                        onChange={setAge}
                    />
                    {errors.age && <span>This field is required</span>}
                </Form.Group>
                {props.isEmployee && (
                    <>
                        <Form.Group>
                            <FormControl
                                {...register('diagnosis', { required: true })}
                                placeholder="Diagnosis"
                                name="diagnosis"
                                type="text"
                                value={diagnosis}
                                onChange={setDiagnosis}
                            />
                            {errors.diagnosis && (
                                <span>This field is required</span>
                            )}
                        </Form.Group>

                        <Form.Group>
                            <FormControl
                                {...register('treatment', { required: true })}
                                placeholder="Treatment"
                                name="treatment"
                                type="text"
                                value={treatment}
                                onChange={setTreatment}
                            />
                            {errors.treatment && (
                                <span>This field is required</span>
                            )}
                        </Form.Group>

                        <Form.Group>
                            <FormControl
                                as="select"
                                {...register('owner', {
                                    required: true,
                                })}
                                name="owner"
                                value={owner}
                                onChange={setOwner}
                            >
                                <option value="">--Choose one--</option>
                                {ownersList}
                            </FormControl>
                            {errors.owner && (
                                <span>This field is required</span>
                            )}
                        </Form.Group>
                    </>
                )}

                {message && <p style={{ color: 'red' }}>{message}</p>}
                <button className={style.Button} type="submit">
                    <span>+</span>
                </button>
                <button onClick={() => props.history.goBack()}>Back</button>

                {message && <p style={{ color: 'red' }}>{message}</p>}
            </Form>
        </div>
    );
};

export default AddPet;
