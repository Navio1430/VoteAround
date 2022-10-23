import { validate } from './ChangeUserLocation.js'

const latitudeInput = document.getElementById('map-lat');
const longitudeInput = document.getElementById('map-long');

var markerFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([longitudeInput.value, latitudeInput.value])),
});

var map = new ol.Map({
    target: "map",
    controls: [],
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([longitudeInput.value, latitudeInput.value]),
        zoom: 7,
    }),
});

var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [markerFeature],
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: "../static/assets/marker.png",
        }),
    }),
});

map.addLayer(vectorLayer);

map.on("click", function (evt) {
    var coords = ol.proj.transform(
        evt.coordinate,
        "EPSG:3857",
        "EPSG:4326"
    );

    markerFeature
        .getGeometry()
        .setCoordinates(ol.proj.fromLonLat([coords[0], coords[1]]));

    latitudeInput.value = coords[1];
    longitudeInput.value = coords[0];

    validate();
});