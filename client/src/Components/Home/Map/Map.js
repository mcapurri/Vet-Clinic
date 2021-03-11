import React from 'react';
import style from './Map.module.css';

const Map = () => {
    return (
        <section className={style.Container}>
            <div className={style.infos}>
                <h5> Contact Information </h5>
                <address className="address">
                    Animal Clinic <br /> Buschkrug Allee 206, <br /> 12359
                    Berlin <br /> Germany <br /> +49 157 00 00 00
                </address>
            </div>
            <div>
                <div className={style.Map}></div>
            </div>
        </section>
    );
};

export default Map;
