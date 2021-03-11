import React from 'react';

const Map = () => {
    return (
        <section id="mapSection">
            <div id="infos">
                <h5> Contact Information </h5>
                <address className="address">
                    Animal Clinic <br /> Buschkrug Allee 206, <br /> 12359
                    Berlin <br /> Germany <br /> +49 157 00 00 00
                </address>
            </div>
            <div>
                <h3>Choose the clinic in your nearest! </h3>
                <div id="map"></div>
            </div>
        </section>
    );
};

export default Map;
