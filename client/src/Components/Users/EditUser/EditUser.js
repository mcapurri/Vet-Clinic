import React from 'react';
import style from './EditUser.module.css';
import { Form } from 'react-bootstrap';

const EditUser = (props) => {
    return (
        <Form className={style.Form} onSubmit={props.handleSubmit}>
            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="firstName">
                    Name: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={props.firstName}
                    onChange={(e) => props.handleChange(e)}
                />
            </Form.Group>

            <Form.Group className={style.Group}>
                <Form.Label className={style.Label} htmlFor="lastName">
                    Last name: &nbsp;
                </Form.Label>
                <Form.Control
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={props.lastName}
                    onChange={(e) => props.handleChange(e)}
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
                    value={props.street}
                    onChange={(e) => props.handleChange(e)}
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
                    value={props.zipCode}
                    onChange={(e) => props.handleChange(e)}
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
                    value={props.city}
                    onChange={(e) => props.handleChange(e)}
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
                    value={props.phoneNumber}
                    onChange={(e) => props.handleChange(e)}
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

export default EditUser;
