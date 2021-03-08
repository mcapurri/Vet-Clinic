import React from 'react';

const Dropdown = (props) => {
    return (
        <div>
            <label htmlFor="role">Role: </label>
            <select
                name="role"
                id="role"
                style={{ width: ' 6rem' }}
                onChange={props.handleChange}
            >
                <option value="">All</option>
                {props.usersOptions}
            </select>
        </div>
    );
};

export default Dropdown;
