import React from 'react';

const Checkbox = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginLeft: '10%',
                width: '100%',
            }}
        >
            <input
                type="checkbox"
                name={props.name}
                checked={props.checked}
                onChange={props.handleChange}
                style={{ transform: 'scale(1.5)' }}
            />
            <label style={{ marginLeft: '15%' }} htmlFor={props.name}>
                {props.label}
            </label>
        </div>
    );
};

export default Checkbox;
