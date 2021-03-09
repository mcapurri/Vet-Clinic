import React, { useState, useEffect } from 'react';
import style from './PetsList.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '../../Filters/Filters';
import Spinner from '../../UI/Spinner/Spinner';

const PetsList = (props) => {
    const [petsList, setPetsList] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [isDog, setIsDog] = useState(true);
    const [isCat, setIsCat] = useState(true);
    const [isBird, setIsBird] = useState(true);
    const [isReptile, setIsReptile] = useState(true);
    const [isOther, setIsOther] = useState(true);

    const fetchData = () => {
        console.log('fetching data');
        axios
            .get('/api/pets')
            .then((pets) => {
                setPetsList(pets.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        console.log('useEffect running');
        fetchData();
    }, []);

    console.log('petsList', petsList);

    const handleChange = (event) => {
        if (event.target.type === 'checkbox') {
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

    const filteredSearch = petsList.filter((element) => {
        return (
            ((isDog && element.specie === 'dog') ||
                (isCat && element.specie === 'cat') ||
                (isBird && element.specie === 'bird') ||
                (isReptile && element.specie === 'reptile') ||
                (isOther && element.specie === 'other')) &&
            (`${element.name}`
                .toLowerCase()
                .includes(`${searchField.toLowerCase()}`) ||
                `${element.lastName}`
                    .toLowerCase()
                    .includes(`${searchField.toLowerCase()}`))
        );
    });

    const displayUsers = filteredSearch.map((pet) => {
        return (
            <tr key={pet._id} className={style.resultCard}>
                <td style={{ width: '30%' }}>
                    <Link to={`/pets/${pet._id}`}>{pet.name}</Link>
                </td>
                <td>{pet.specie}</td>

                <td>{pet.owner}</td>
            </tr>
        );
    });

    if (!petsList) return <Spinner />;
    return (
        <div className={style.Container}>
            <Filters
                handleChange={handleChange}
                isDog={isDog}
                isCat={isCat}
                isBird={isBird}
                isReptile={isReptile}
                isOther={isOther}
                // userRoleOptions={userRoleOptions}
            />
            <table style={{ margin: '0 0 10% 5%' }}>
                <tbody>{displayUsers}</tbody>
            </table>
            <button
                className={style.Button}

                // disabled={!formIsValid}
            >
                <Link to={'/pets/add'}>
                    <h1 style={{ fontSize: 'bold' }}>+</h1>
                </Link>
            </button>
        </div>
    );
};

export default PetsList;
