import React from 'react';

const Dropdown = (props) => {
    return (
        <div>
            <label htmlFor="role">Role: </label>
            <select
                name="role"
                id="role"
                style={{ width: ' 7rem' }}
                onChange={props.handleChange}
            >
                <option value="">All</option>
                {props.userRoleOptions}
            </select>
        </div>
    );
};

export default Dropdown;
