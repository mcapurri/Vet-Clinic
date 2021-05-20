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
    const [isRodent, setIsRodent] = useState(true);
    const [isBird, setIsBird] = useState(true);
    const [isReptile, setIsReptile] = useState(true);
    const [isOther, setIsOther] = useState(true);
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        try {
            const pets = await axios.get('/api/pets', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPetsList(pets.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // console.log('petsList', petsList);

    const handleChange = (event) => {
        if (event.target.type === 'checkbox') {
            if (event.target.name === 'dog') {
                setIsDog(() => !isDog);
            } else if (event.target.name === 'cat') {
                setIsCat(() => !isCat);
            } else if (event.target.name === 'bird') {
                setIsBird(() => !isBird);
            } else if (event.target.name === 'rodent') {
                setIsRodent(() => !isRodent);
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
                (isRodent && element.specie === 'rodent') ||
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

    const displayPets = filteredSearch.map((pet) => {
        console.log('pet', pet);
        return (
            <tr key={pet._id} className={style.resultCard}>
                <td>
                    <Link to={`/pets/${pet._id}`}>{pet.name}</Link>
                </td>
                <td>{pet.specie}</td>
                <td>
                    {pet.owner.name} {pet.owner.lastName}
                </td>
            </tr>
        );
    });

    if (!petsList) return <Spinner />;
    return (
        <div className={style.Container}>
            <div className={style.Card}>
                <Filters
                    handleChange={handleChange}
                    isDog={isDog}
                    isCat={isCat}
                    isBird={isBird}
                    isRodent={isRodent}
                    isReptile={isReptile}
                    isOther={isOther}
                />
                <button className={style.Button}>
                    <Link to={'/pets/add'}>
                        <span>+</span>
                    </Link>
                </button>
                <table>
                    <tbody>{displayPets}</tbody>
                </table>
            </div>
        </div>
    );
};

export default PetsList;
