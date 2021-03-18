import React, { useRef, useEffect, useState } from 'react';
import style from './Map.module.css';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
    'pk.eyJ1IjoibWNhcHVycmkiLCJhIjoiY2tsMmR4Z2NmMDgwaDJ1cDEycmEyN3NiaCJ9.Mmr5igenBPR3QkJOKMgG3A';

const Map = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(13.405);
    const [lat, setLat] = useState(52.52);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });
        // setting a popup
        const popup = new mapboxgl.Popup({
            closeButton: false,
        });
        popup
            .setLngLat([13.455, 52.45])
            // .setHTML('<h3>Animal Clinic</h3>')
            .setHTML('<span>we are here</span>')
            .setMaxWidth('200px')
            .addTo(map);

        // Geocoder
        // map.addControl(
        //     new MapboxGeocoder({
        //         accessToken: mapboxgl.accessToken,
        //         mapboxgl: mapboxgl,
        //     })
        // );
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
        return () => map.remove();
    }, []);

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
                {/* <div className={style.Sidebar}>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div> */}
                <div className={style.Map} ref={mapContainer}></div>
            </div>
        </section>
    );
};

export default Map;
