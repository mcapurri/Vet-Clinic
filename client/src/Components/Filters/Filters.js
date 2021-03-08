import React from 'react';
import Checkbox from '../UI/Checkbox/Checkbox';
import Dropdown from '../UI/Dropdown/Dropdown';
import SearchField from '../UI/SearchField/SearchField';

const Filters = (props) => {
    return (
        <form
            style={{
                width: '80vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
            }}
        >
            <SearchField handleChange={props.handleChange} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '30rem',
                    marginBottom: '10%',
                }}
            >
                {props.usersOptions ? (
                    <Dropdown
                        usersOptions={props.usersOptions}
                        handleChange={props.handleChange}
                    />
                ) : (
                    <div>
                        <Checkbox
                            isDog={props.isDog}
                            handleChange={props.handleChange}
                        />
                        <Checkbox
                            isCat={props.isCat}
                            handleChange={props.handleChange}
                        />
                        <Checkbox
                            isBird={props.isBird}
                            handleChange={props.handleChange}
                        />
                        <Checkbox
                            isReptile={props.isReptile}
                            handleChange={props.handleChange}
                        />
                        <Checkbox
                            isOther={props.isOther}
                            handleChange={props.handleChange}
                        />
                    </div>
                )}
            </div>
        </form>
    );
};

export default Filters;
