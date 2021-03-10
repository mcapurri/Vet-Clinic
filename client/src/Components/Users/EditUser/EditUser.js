import React from 'react';
import style from './EditUser.module.css';

const editUser = (props) => {
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
                        value={props.selectedUserForm.name}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="name">Last name: &nbsp;</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={props.selectedUserForm.lastName}
                        onChange={props.handleChange}
                    />
                </div>
                {/* <div className={style.Input}>
                    <label htmlFor="name">E-mail: &nbsp;</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={props.selectedUserForm.email}
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
                </div> */}
                <div className={style.Input}>
                    <label htmlFor="street">Street: &nbsp;</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={props.selectedUserForm.address.street}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="zipCode">ZIP Code: &nbsp;</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={props.selectedUserForm.address.zipCode}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="city">City: &nbsp;</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={props.selectedUserForm.address.city}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="state">State: &nbsp;</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={props.selectedUserForm.address.state}
                        onChange={props.handleChange}
                    />
                </div>
                <div className={style.Input}>
                    <label htmlFor="phoneNum">Phone Num: &nbsp;</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={props.selectedUserForm.phoneNumber}
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

export default editUser;
