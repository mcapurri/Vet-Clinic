import React from 'react';
import style from './EditPet.module.css';

const editPet = (props) => {
    // console.log('props editPet', props);

    return (
        <div>
            <form className={style.Form} onSubmit={props.handleSubmit}>
                <h2>Edit </h2>
                <div className={style.Input}>
                    <label htmlFor="name">Name: &nbsp;</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={props.selectedPet.name}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="specie">Specie: &nbsp;</label>

                    <select
                        name="specie"
                        value={props.selectedPet.specie}
                        onChange={props.handleChange}
                    >
                        <option value="">--choose an option--</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="rodent">Roden</option>
                        <option value="reptile">Reptile</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className={style.Input}>
                    <label htmlFor="breed">Breed: &nbsp;</label>
                    <input
                        type="text"
                        id="breed"
                        name="breed"
                        value={props.selectedPet.breed}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="age">Age: &nbsp;</label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={props.selectedPet.age}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="diagnosis">Diagnosis: &nbsp;</label>
                    <input
                        type="text"
                        id="diagnosis"
                        name="diagnosis"
                        value={props.selectedPet.diagnosis}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="treatment">Treatment: &nbsp;</label>
                    <input
                        type="text"
                        id="treatment"
                        name="treatment"
                        value={props.selectedPet.treatment}
                        onChange={props.handleChange}
                    />
                </div>

                <div className={style.buttons}>
                    <button type="submit">Update</button>
                    <button onClick={props.toggleEditForm}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default editPet;
