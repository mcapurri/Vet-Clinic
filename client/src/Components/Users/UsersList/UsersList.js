import React from 'react';
import style from './UserList.module.css';
import { Link } from 'react-router-dom';
// import { useLocalStorage } from '../../../utils/utility';

const UsersList = (props) => {
    // const [userList, setUserList] = useLocalStorage(props.usersList || '');
    const displayUsers = props.usersList.map((user) => {
        console.log('user from UList', user);
        console.log('props from UList', props);
        return (
            <tr key={user._id} className={style.resultCard}>
                <td style={{ width: '30%' }}>
                    <Link to={`/users/${user._id}`}>
                        {user.lastName}, {user.name}
                    </Link>
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
