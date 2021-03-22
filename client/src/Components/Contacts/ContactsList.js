import React, { useState, useEffect } from 'react';
import style from './ContactsList.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Filters from '.././Filters/Filters';
import Spinner from '.././UI/Spinner/Spinner';

const ContactsList = () => {
    const [contactsList, setContactsList] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [isAppointment, setIsAppointment] = useState(true);
    const [isRequest, setIsRequest] = useState(true);

    const fetchData = () => {
        axios
            .get('/api/contacts')
            .then((contacts) => {
                setContactsList(contacts.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log('contactsList', contactsList);

    const handleChange = (event) => {
        console.log('event target', event.target);
        if (event.target.type === 'checkbox') {
            if (event.target.name === 'appointment') {
                setIsAppointment(() => !isAppointment);
            } else if (event.target.name === 'request') {
                setIsRequest(() => !isRequest);
            } else {
                setSearchField(event.target.value);
            }
        }
    };
    console.log('isAppointment', isAppointment);
    console.log('isRequest', isRequest);

    // const filteredSearch = petsList.filter((element) => {
    //     return (
    //         ((isDog && element.specie === 'dog') ||
    //             (isCat && element.specie === 'cat') ||
    //             (isBird && element.specie === 'bird') ||
    //             (isRodent && element.specie === 'rodent') ||
    //             (isReptile && element.specie === 'reptile') ||
    //             (isOther && element.specie === 'other')) &&
    //         (`${element.name}`
    //             .toLowerCase()
    //             .includes(`${searchField.toLowerCase()}`) ||
    //             `${element.lastName}`
    //                 .toLowerCase()
    //                 .includes(`${searchField.toLowerCase()}`))
    //     );
    // });

    // const displayUsers = filteredSearch.map((pet) => {
    //     console.log('pet', pet);
    //     return (
    //         <tr key={pet._id} className={style.resultCard}>
    //             <td style={{ width: '30%' }}>
    //                 <Link to={`/pets/${pet._id}`}>{pet.name}</Link>
    //             </td>
    //             <td>{pet.specie}</td>

    //             <td>{/* {pet.owner.name}, {pet.owner.lastName} */}</td>
    //         </tr>
    //     );
    // });

    if (!contactsList) return <Spinner />;
    return (
        <div className={style.Container}>
            <Filters
                handleChange={handleChange}
                isAppointment={isAppointment}
                isRequest={isRequest}
            />
            <button className={style.Button}>
                <Link to={'/pets/add'}>
                    <span>+</span>
                </Link>
            </button>
            <table style={{ margin: '0 0 10% 5%' }}>
                {/* <tbody>{displayUsers}</tbody> */}
            </table>
        </div>
    );
};

export default ContactsList;
