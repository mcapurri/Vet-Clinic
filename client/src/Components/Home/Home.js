import React, { useState } from 'react';
import style from './Home.module.css';
import Carousel from './Carousel/Carousel';
import GeneralInfos from './GeneralInfos/GeneralInfos';
import MessageForm from './MessageForm/MessageForm';
import Map from './Map/Map';

const Home = (props) => {
    const [requestedAddress, setRequestedAddress] = useState({
        street: '',
        city: '',
        zipCode: '',
    });
    console.log('reqAddress', requestedAddress);
    return (
        <div className={style.Home}>
            <Carousel />
            <GeneralInfos />
            <MessageForm
                user={props.user}
                requestedAddress={requestedAddress}
                setRequestedAddress={setRequestedAddress}
            />
            <Map setRequestedAddress={setRequestedAddress} />
        </div>
    );
};

export default Home;
