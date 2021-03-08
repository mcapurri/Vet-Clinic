import React from 'react';

const Checkbox = (props) => {
    return (
        <>
            <div style={{ marginRight: '2%' }}>
                <label htmlFor="teacher">Checkbox</label>
                <input
                    type="checkbox"
                    // name={props.pet.options}
                    // checked={props.isTeacher}
                    onChange={props.handleChange}
                />
            </div>
            {/* <div style={{ marginRight: '2%' }}>
                <label htmlFor="student">Student</label>
                <input
                    type="checkbox"
                    name="cat"
                    checked={props.isStudent}
                    onChange={props.handleChange}
                />
            </div> */}
        </>
    );
};

export default Checkbox;
