import { validate } from './SignupValidation.js'

var markerFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([19.38, 52.12])),
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
        center: ol.proj.fromLonLat([19.38, 52.12]),
        zoom: 6,
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

    document.getElementById("map-long").value = coords[0];
    document.getElementById("map-lat").value = coords[1];

    validate();
});