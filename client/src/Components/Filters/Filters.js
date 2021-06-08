import React from 'react';
import style from './Filters.module.css';
import Checkbox from '../UI/Checkbox/Checkbox';
import Dropdown from '../UI/Dropdown/Dropdown';
import SearchField from '../UI/SearchField/SearchField';

const Filters = (props) => {
    let checkboxes;

    (props.isDog ||
        props.isCat ||
        props.isBird ||
        props.isRodent ||
        props.isReptile ||
        props.isOther) &&
        (checkboxes = (
            <div className={style.Container}>
                <Checkbox
                    name="dog"
                    label="Dog"
                    checked={props.isDog}
                    handleChange={props.handleChange}
                />
                <Checkbox
                    name="cat"
                    label="Cat"
                    checked={props.isCat}
                    handleChange={props.handleChange}
                />
                <Checkbox
                    name="bird"
                    label="Bird"
                    checked={props.isBird}
                    handleChange={props.handleChange}
                />
                <Checkbox
                    name="rodent"
                    label="Rodent"
                    checked={props.isRodent}
                    handleChange={props.handleChange}
                />
                <Checkbox
                    name="reptile"
                    label="Reptile"
                    checked={props.isReptile}
                    handleChange={props.handleChange}
                />
                <Checkbox
                    name="other"
                    label="Other"
                    checked={props.isOther}
                    handleChange={props.handleChange}
                />
            </div>
        ));
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
            <div className={style.ChecksContainer}>
                {props.userRoleOptions ? (
                    <Dropdown
                        userRoleOptions={props.userRoleOptions}
                        handleChange={props.handleChange}
                    />
                ) : (
                    checkboxes
                )}
            </div>
        </form>
    );
};

export default Filters;
