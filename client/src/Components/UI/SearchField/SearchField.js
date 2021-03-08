import React from 'react';

const SearchField = (props) => {
    return (
        <div
            style={{
                margin: '5% 0 3% 0',
            }}
        >
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
