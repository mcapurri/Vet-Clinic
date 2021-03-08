import React from 'react';

const Checkbox = (props) => {
    return (
        <>
            <div style={{ marginRight: '2%' }}>
                <label htmlFor="teacher">Teacher</label>
                <input
                    type="checkbox"
                    name={props.pet.type}
                    checked={props.isTeacher}
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
