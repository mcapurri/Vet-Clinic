import React from 'react';
import style from './SearchField.module.css';

const SearchField = (props) => {
    return (
        <div className={style.SearchField}>
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
                onChange={props.handleChange}
                style={{ width: '20rem' }}
            />
        </div>
    );
};

export default SearchField;
