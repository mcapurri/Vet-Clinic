import React from 'react';
import style from './Home.module.css';
import Carousel from './Carousel/Carousel';
import GenInfos from './GenInfos/GenInfos';
import EmergencyForm from './EmergencyForm/EmergencyForm';
import Map from './Map/Map';

const Home = (props) => {
    return (
        <div className={style.Home}>
            <Carousel />
            <GenInfos />
            <EmergencyForm user={props.user} />
            <Map />
        </div>
    );
};

export default Home;
