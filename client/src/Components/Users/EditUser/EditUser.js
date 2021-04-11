import React from 'react';
import style from './EditUser.module.css';
import { Form } from 'react-bootstrap';

const editUser = (props) => {
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
                    value={props.selectedUserForm.name}
                    onChange={props.handleChange}
                />
            </Form.Group>

            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="name">
                    Last name: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={props.selectedUserForm.lastName}
                    onChange={props.handleChange}
                />
            </Form.Group>
            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="street">
                    Street: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="street"
                    name="street"
                    value={props.selectedUserForm.address.street}
                    onChange={props.handleChange}
                />
            </Form.Group>

            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="zipCode">
                    ZIP Code: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={props.selectedUserForm.address.zipCode}
                    onChange={props.handleChange}
                />
            </Form.Group>

            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="city">
                    City: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="city"
                    name="city"
                    value={props.selectedUserForm.address.city}
                    onChange={props.handleChange}
                />
            </Form.Group>

            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="phoneNum">
                    Phone Num: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={props.selectedUserForm.phoneNumber}
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

export default editUser;
