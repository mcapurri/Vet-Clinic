import React, { useState, useEffect } from 'react';
import style from './UserList.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '../../Filters/Filters';
import Spinner from '../../UI/Spinner/Spinner';

const UsersList = (props) => {
    console.log('userList props', props);
    const [usersList, setUsersList] = useState('');
    const [searchField, setSearchField] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [isDog, setIsDog] = useState(true);
    const [isCat, setIsCat] = useState(true);
    const [isBird, setIsBird] = useState(true);
    const [isReptile, setIsReptile] = useState(true);
    const [isOther, setIsOther] = useState(true);

    const fetchData = () => {
        axios
            .get('/api/users')
            .then((users) => {
                setUsersList(users.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (event) => {
        if (event.target.type === 'select-one') {
            setSelectedRole(event.target.value);
        } else if (event.target.type === 'checkbox') {
            if (event.target.name === 'dog') {
                setIsDog(() => !isDog);
            } else if (event.target.name === 'cat') {
                setIsCat(() => !isCat);
            } else if (event.target.name === 'bird') {
                setIsBird(() => !isBird);
            } else if (event.target.name === 'reptile') {
                setIsReptile(() => !isReptile);
            } else {
                setIsOther(() => !isOther);
            }
        } else {
            setSearchField(event.target.value);
        }
    };
    const filteredSearch = usersList.filter((element) => {
        return (
            // ((isDog && element.specie === 'dog') ||
            //     (isCat && element.specie === 'cat')) &&
            (`${element.name}`
                .toLowerCase()
                .includes(`${searchField.toLowerCase()}`) ||
                `${element.lastName}`
                    .toLowerCase()
                    .includes(`${searchField.toLowerCase()}`)) &&
            (element.role === selectedRole || !selectedRole)
        );
        // );
    });

    const displayUsers = usersList.map((user) => {
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
                        return <h3>&#9732;</h3>;
                    })}
                </td>
            </tr>
        );
    });

    const usersOptions = (
        <>
            <option value="employee">employee</option>
            <option value="client">client</option>
        </>
    );
    if (!usersList) return <Spinner />;
    return (
        <div className={style.Container}>
            <Filters usersOptions={usersOptions} handleChange={handleChange} />
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
