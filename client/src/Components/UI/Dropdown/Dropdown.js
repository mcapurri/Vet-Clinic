import React from 'react';
import style from './Dropdown.module.css';

const Dropdown = (props) => {
    return (
        <div className={style.Dropdown}>
            <label htmlFor="role">Role: </label>
            <select
                name="role"
                id="role"
                style={{ width: ' 7rem', margin: '5% 0 0 5%' }}
                onChange={props.handleChange}
            >
                <option value="">All</option>
                {props.userRoleOptions}
            </select>
        </div>
    );
};

export default Dropdown;
