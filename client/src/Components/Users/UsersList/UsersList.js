import React from 'react';
import style from './UserList.module.css';
import { Link } from 'react-router-dom';

const UsersList = (props) => {
    const displayUsers = props.usersList.map((user) => {
        console.log('user from UList', user);
        console.log('props from UList', props);
        return (
            // <div key={user._id} className={style.resultCard}>
            //     <span>
            //         <Link to={`/users/${user._id}`}>
            //             {user.name} {user.lastName}
            //         </Link>
            //     </span>
            //     <span>{user.role}</span>
            // </div>
            <tr key={user._id} className={style.resultCard}>
                <td>
                    {user.lastName}, {user.name}
                </td>
                <td>{user.role}</td>

                <td>
                    {user.pets.map((pet) => {
                        <h3>&#9732;</h3>;
                    })}
                </td>
            </tr>
        );
    });
    return (
        <div className={style.Container}>
            <table style={{ margin: '0 0 10% 5%' }}>
                <tbody>{displayUsers}</tbody>
            </table>
            <button
                className={style.Button}

                // disabled={!formIsValid}
            >
                <Link to={'/users/add'}>
                    <h1 style={{ fontSize: 'bold' }}>+</h1>
                </Link>
            </button>
        </div>
    );
};

export default UsersList;
