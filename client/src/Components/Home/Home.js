import React, { useState } from 'react';
import style from './Home.module.css';
import Carousel from './Carousel/Carousel';
import GeneralInfos from './GeneralInfos/GeneralInfos';
import MessageForm from './MessageForm/MessageForm';
import Map from './Map/Map';

const Home = (props) => {
    // console.log(props)
    const [requestedAddress, setRequestedAddress] = useState({
        street: '',
        city: '',
        zipCode: '',
    });
    return (
        <div className={style.Home}>
            <Carousel />
            <GeneralInfos />
            <MessageForm
                user={props.user}
                requestedAddress={requestedAddress}
                setRequestedAddress={setRequestedAddress}
            />
            <Map
                setRequestedAddress={setRequestedAddress}
                width={props.width}
            />
        </div>
    );
};

export default Home;
