import React from 'react';
import style from './Checkbox.module.css';

const Checkbox = (props) => {
    return (
        <div className={style.Checkbox}>
            <input
                type="checkbox"
                name={props.name}
                checked={props.checked}
                onChange={props.handleChange}
                style={{ transform: 'scale(1.5)' }}
                disabled={props.disabled}
            />
            <label className={style.Label} htmlFor={props.name}>
                {props.label}
            </label>
        </div>
    );
};

export default Checkbox;
