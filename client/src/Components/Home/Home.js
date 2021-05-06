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
    return (
        <div className={style.Home}>
            <section
                className={style.Session}
                style={{ backgroundColor: 'rgb(194, 127, 50)' }}
            >
                <Carousel />
            </section>
            <section className={style.Session}>
                <GeneralInfos />
            </section>
            <section className={style.Session}>
                <MessageForm
                    user={props.user}
                    requestedAddress={requestedAddress}
                    setRequestedAddress={setRequestedAddress}
                />
            </section>
            <section>
                <Map
                    setRequestedAddress={setRequestedAddress}
                    width={props.width}
                />
            </section>
        </div>
    );
};

export default Home;
