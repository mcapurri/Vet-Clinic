import React, { useState } from 'react';
import style from './Home.module.css';
import Carousel from './Carousel/Carousel';
import GenInfos from './GenInfos/GenInfos';
import EmergencyForm from './AppointmentForm/AppointmentForm';
import Map from './Map/Map';

const Home = (props) => {
    const [requestedAddress, setRequestedAddress] = useState({
        street: '',
        city: '',
        zipCode: '',
        lngLat: '',
    });
    console.log('reqAddress', requestedAddress);
    return (
        <div className={style.Home}>
            <Carousel />
            <GenInfos />
            <EmergencyForm
                user={props.user}
                requestedAddress={requestedAddress}
            />
            <Map setRequestedAddress={setRequestedAddress} />
        </div>
    );
};

export default Home;
