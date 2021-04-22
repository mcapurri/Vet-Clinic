import React from 'react';
import style from './EditPet.module.css';
import { Form } from 'react-bootstrap';

const editPet = (props) => {
    // console.log('props editPet', props);

    return (
        <Form className={style.Form} onSubmit={props.handleSubmit}>
            <h2>Edit </h2>
            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="name">
                    Name: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    value={props.name}
                    onChange={props.handleChange}
                />
            </Form.Group>

            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="specie">
                    Specie: &nbsp;
                </Form.Label>
                <Form.Control
                    as="select"
                    name="specie"
                    value={props.specie}
                    onChange={props.handleChange}
                >
                    <option value="">--choose an option--</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rodent">Rodent</option>
                    <option value="reptile">Reptile</option>
                    <option value="other">Other</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="breed">
                    Breed: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="breed"
                    name="breed"
                    value={props.breed}
                    onChange={props.handleChange}
                />
            </Form.Group>

            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="age">
                    Age: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="age"
                    name="age"
                    value={props.age}
                    onChange={props.handleChange}
                />
            </Form.Group>

            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="diagnosis">
                    Diagnosis: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="diagnosis"
                    name="diagnosis"
                    value={props.diagnosis}
                    onChange={props.handleChange}
                />
            </Form.Group>

            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="treatment">
                    Treatment: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="treatment"
                    name="treatment"
                    value={props.treatment}
                    onChange={props.handleChange}
                />
            </Form.Group>

            <div className={style.buttons}>
                <button onClick={props.toggleEditForm}>Back</button>
                <button style={{ marginRight: '10%' }} type="submit">
                    Update
                </button>
            </div>
        </Form>
    );
};

export default editPet;
