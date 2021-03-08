import React from 'react';
import style from './EditUser.module.css';
import { Link } from 'react-router-dom';

const editUser = (props) => {
    console.log('props editUser', props);

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
                        // value={props.selectedUser.name}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="name">Last name: &nbsp;</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        // value={props.selectedUser.lastName}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="name">E-mail: &nbsp;</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        // value={props.selectedUser.email}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="password">Password: &nbsp;</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value=""
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="confirm"> Confirm Password: &nbsp;</label>
                    <input
                        type="text"
                        id="confirm"
                        name="confirm"
                        value=""
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="street">Street: &nbsp;</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        // value={props.selectedUser.address.street}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="zipCode">ZIP Code: &nbsp;</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        // value={props.selectedUser.address.zipCode}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="city">City: &nbsp;</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        // value={props.selectedUser.address.city}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="state">State: &nbsp;</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        // value={props.selectedUser.address.state}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="phoneNum">Phone Num: &nbsp;</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        // value={props.selectedUser.phoneNumber}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.buttons}>
                    <button type="submit">Update</button>
                    <button onClick={props.toggleEditForm}>Back</button>
                    {/* <Link to={`/users/${props.selectedUser._id}`}>Back</Link> */}
                </div>
            </form>
        </div>
    );
};

export default editUser;
