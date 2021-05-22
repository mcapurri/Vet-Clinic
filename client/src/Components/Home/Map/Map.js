import React, { useRef, useEffect, useState } from 'react';
import style from './Map.module.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../../utils/config.json';

const Map = ({ setRequestedAddress, width }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [berlin, setBerlin] = useState({
        lng: 13.405,
        lat: 52.49,
        zoom: 13,
    });

    let lngLat;

    let address = async (lngLat) => {
        try {
            const address = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}&cachebuster=1616347496121&autocomplete=true&types=address&types=place&`
            );
            setRequestedAddress({
                street:
                    address.data.features[0].text +
                    ', ' +
                    address.data.features[0].address,
                city: address.data.features[0].context[2].text,
                zipCode: address.data.features[0].context[0].text,
                coords: lngLat,
            });
        } catch (err) {
            console.log(err);
        }
    };
    // useEffect(() => {
    //     if (map.current) return; // initialize map only once
    //     map.current = new mapboxgl.Map({
    //         container: mapContainer.current,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         center: [berlin.lng, berlin.lat],
    //         zoom: berlin.zoom,
    //         accessToken: MAPBOX_ACCESS_TOKEN,
    //     });
    // });

    // useEffect(() => {
    //     if (!map.current) return; // wait for map to initialize
    //     map.current.on('move', () => {
    //         setBerlin({
    //             ...berlin,
    //             lng: map.current.getCenter().lng.toFixed(4),
    //         });
    //         setBerlin({
    //             ...berlin,
    //             lat: map.current.getCenter().lat.toFixed(4),
    //         });
    //         setBerlin({ ...berlin, zoom: map.current.getZoom().toFixed(2) });
    //     });
    // });

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            baseApiUrl: 'https://api.mapbox.com',
            style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
            center: [berlin.lng, berlin.lat],
            zoom: berlin.zoom,
            accessToken: MAPBOX_ACCESS_TOKEN,
        });
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        );

        // setting a popup
        const popup = new mapboxgl.Popup({
            closeButton: false,
            className: style.Popup,
        });
        popup
            .setLngLat([13.39, 52.49])
            .setHTML('<span>we are here</span>')
            .setMaxWidth('200px')
            .addTo(map);

        map.on('move', () => {
            setBerlin({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lng.toFixed(4),
                zoom: map.getZoom().toFixed(2),
            });
        });

        // set Marker
        const marker = new mapboxgl.Marker({
            scale: 1,
            color: 'red',
            draggable: true,
        });
        const addMarker = (event) => {
            // console.log(event.lngLat);
            marker.setLngLat(event.lngLat).addTo(map);
            address(event.lngLat);
        };
        map.on('click', addMarker);

        const onDragEnd = async () => {
            lngLat = marker.getLngLat();

            address(lngLat);
        };

        marker.on('dragend', onDragEnd);

        return () => map.remove();
    }, []);

    return (
        <Row className={style.Container}>
            {width > '768' && (
                <Col xs={6} md={4}>
                    <div className={style.Infos}>
                        <address className="address">
                            Animal Clinic <br /> Buschkrug Allee 206, <br />{' '}
                            12359 Berlin <br /> Germany <br />{' '}
                            <small>+49 157 00 00 00</small>
                        </address>
                    </div>
                </Col>
            )}
            <Col xs={12} md={8} className="d-flex justify-content-center">
                <div className={style.Map} ref={mapContainer}></div>
            </Col>
        </Row>
    );
};

export default Map;
