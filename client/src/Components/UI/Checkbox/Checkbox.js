import React from 'react';

const Checkbox = (props) => {
    console.log('props Checkbox', props);
    let name;
    let label;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                marginLeft: '10%',
            }}
        >
            <input
                type="checkbox"
                name={props.name}
                checked={props.checked}
                onChange={props.handleChange}
            />
            <label style={{ marginLeft: '15%' }} htmlFor={name}>
                {props.label}
            </label>
        </div>
    );
};

export default Checkbox;
