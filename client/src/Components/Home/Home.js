import React from 'react';
import Carousel from './Carousel/Carousel';
import GenInfos from './GenInfos/GenInfos';
import EmergencyForm from './EmergencyForm/EmergencyForm';
import Map from './Map/Map';

const Home = () => {
    return (
        <div>
            <Carousel />
            <GenInfos />
            <EmergencyForm />
            <Map />
        </div>
    );
};

export default Home;
