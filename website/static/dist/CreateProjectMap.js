import { validate } from './CreateProject.js'

const latitudeInput = document.getElementById('map-lat');
const longitudeInput = document.getElementById('map-long');

let initialCoordinates = ol.proj.fromLonLat([19.38, 52.12]);
let circleFeature = new ol.Feature({
    geometry: new ol.geom.Circle(
        [0, 0], // center
        0 // radius
    ),
});

let map = new ol.Map({
    target: 'map',
    controls: [],
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
    ],
    view: new ol.View({
        center: initialCoordinates,
        zoom: 6,
    }),
});

let vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [circleFeature],
    }),
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(20, 100, 240, 0.3)',
        }),
        stroke: new ol.style.Stroke({
            width: 3,
            color: 'rgba(0, 100, 240, 0.8)',
        }),
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: 'rgba(55, 200, 150, 0.5)',
            }),
            stroke: new ol.style.Stroke({
                width: 10,
                color: 'rgba(55, 200, 150, 0.8)',
            }),
            radius: 7,
        }),
    }),
});

let center = initialCoordinates;
let radius = 0;

map.addLayer(vectorLayer);

let geometry = circleFeature.getGeometry();

const radiusChanged = () => {
    radius = document.getElementById('map-radius').value;

    geometry.setCenter(ol.proj.fromLonLat(center));
    geometry.setRadius(parseInt(radius));
};

map.addEventListener('click', function (evt) {
    radius = document.getElementById('map-radius').value;
    center = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');

    geometry.setCenter(ol.proj.fromLonLat(center));
    geometry.setRadius(parseInt(radius));

    latitudeInput.value = center[1];
    longitudeInput.value = center[0];

    validate();
});