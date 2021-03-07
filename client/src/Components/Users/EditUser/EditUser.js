import React from 'react';
import style from './EditUser.module.css';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const editUser = (props) => {
    console.log('props editUser', props);

    return (
        <div>
            <h2>Edit </h2>
            <form className={style.Form} onSubmit={props.handleSubmit}>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={props.selectedUser.name}
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={props.selectedUser.lastName}
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={props.selectedUser.email}
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={props.selectedUser.password}
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    id="street"
                    name="street"
                    value={props.selectedUser.street}
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={props.selectedUser.zipCode}
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={props.selectedUser.city}
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={props.selectedUser.state}
                    onChange={props.handleChange}
                />
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={props.selectedUser.phoneNumber}
                    onChange={props.handleChange}
                />
                <div className={style.buttons}>
                    <button type="submit">Update</button>
                    <button onClick={props.toggleEditForm}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default editUser;
