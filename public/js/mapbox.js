// clinics
const flidaisVet = [13.455, 52.446]; //'Buschkrug Allee 206, 12359 Berlin';

const demmler_whehming = [13.432, 52.496]; //'Wiener Straße 25, 10999 Berlin';

const tierMedizinZentrum = [13.337, 52.485]; //'Kufsteiner Straße 22, 10825 Berlin';

const lenkTierPraxis = [13.408, 52.55]; //'Schönfließer Straße 1, 10439 Berlin';

mapboxgl.accessToken =
    'pk.eyJ1IjoibWNhcHVycmkiLCJhIjoiY2tsMmR4Z2NmMDgwaDJ1cDEycmEyN3NiaCJ9.Mmr5igenBPR3QkJOKMgG3A';

// var geocoder = mapboxgl.geocoder('mapbox.places');

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [13.405, 52.52], // starting position [lng, lat]
    zoom: 9, // starting zoom
    doubleClickZoom: true,
    // pitch: 100
});

// const showMap = (err, data) => {
//     // The geocoder can return an area, like a city, or a
//     // point, like an address. Here we handle both cases,
//     // by fitting the map bounds to an area or zooming to a point.
//     if (data.lbounds) {
//         map.fitBounds(data.lbounds);
//     } else if (data.latlng) {
//         map.setView([data.latlng[0], data.latlng[1]], 13);
//     }
// };

// geocoder.query(flidaisVet, showMap);

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// setting a popup
const popup = new mapboxgl.Popup({
    closeButton: false,
});
popup
    .setLngLat([13.455, 52.45])
    .setHTML('<h1>Flidais Vet</h1>')
    .setMaxWidth('400px')
    .addTo(map);

// Geocoder
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
    })
);

let coords = [
    [13.405, 52.52],
    [13.6, 52.6],
];

coords.forEach((coord) => {
    new mapboxgl.Marker({
        scale: 1,
        color: 'red',
        draggable: true,
    })
        .setLngLat(coord)
        .addTo(map)
        .on('dragend', (data) => {
            console.log(data);
        });
});

const addMarker = (event) => {
    console.log(event.lngLat);
    new mapboxgl.Marker({
        scale: 1,
        color: 'red',
    })
        .setLngLat(event.lngLat)
        .addTo(map);
};

map.on('click', addMarker);

// const marker = new mapboxgl.Marker({
//     scale: 1,
//     color: 'red'
// }).setLngLat([13.405, 52.52])
//     .addTo(map)
