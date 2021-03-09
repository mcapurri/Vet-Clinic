import React, { useState, useEffect } from 'react';
import style from './UserList.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '../../Filters/Filters';
import Spinner from '../../UI/Spinner/Spinner';

const UsersList = (props) => {
    const [usersList, setUsersList] = useState([]);
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
                console.log('users', users.data);
                setUsersList(users.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log('usersList', usersList);

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

    const displayUsers = filteredSearch.map((user) => {
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
    // const userRoles = [...new Set(usersList.map((user) => user.role)]
    //  const userRoleOptions = userRoles.map((role) => {
    //      return (
    //          <option value={role} key={role}>
    //              {role}
    //          </option>
    //      );
    //  });
    const userRoleOptions = (
        <>
            <option value="employee">employee</option>
            <option value="client">client</option>
        </>
    );

    const ownerOptions = usersList
        .filter((user) => {
            return user.role === 'client' || user.pets.lenght > 0;
        })
        .map((user) => {
            return {
                value: user._id,
                displayValue: `${user.lastName}, ${user.name}`,
            };
        });
    console.log('ownerOptions', ownerOptions);

    if (!usersList) return <Spinner />;
    return (
        <div className={style.Container}>
            <Filters
                handleChange={handleChange}
                userRoleOptions={userRoleOptions}
            />
            <button className={style.Button}>
                <Link to={'/users/add'}>
                    <span>+</span>
                </Link>
            </button>
            <table style={{ margin: '0 0 10% 5%' }}>
                <tbody>{displayUsers}</tbody>
            </table>
        </div>
    );
};

export default UsersList;
