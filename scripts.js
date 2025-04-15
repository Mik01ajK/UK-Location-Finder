//Main div container for job roles
//Creating option selector for the job roles
// two fields for average salary and maximum house price which will be calculated using a formula
// Finally a table that populatrs with 5 top areas based on average house price for the salary.






//initialising Uk map
var map = L.map('mapContainer', {
    center: [54.7, -2], // Center on Great Britain
    zoom: 3, // Set initial zoom level
    minZoom: 6, // Prevent zooming out too much
    maxZoom: 10, // Prevent zooming in


});

// Restrict to Great Britain (approximate bounding box)
var gbBounds = [
    [100, -10],  // Top-left (NW Scotland)
    [40, 1.8]    // Bottom-right (SE England)
];

map.setMaxBounds(gbBounds);

//Add a tile layer (background map)
var blackMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    opacity: 0
});
blackMap.addTo(map);

fetch('data/uk-boundaries.geojson')
    .then(response => response.json())
    .then(data => {
        // Create the GeoJSON layer and assign it to the geojson variable
        geojson = L.geoJson(data, {
            style: function(feature) {
                return {
                    fillColor: getColor(feature.properties.price), // Use the price property
                    weight: 1,
                    opacity: 1,
                    color: "white",
                    fillOpacity: 0.7
                };
            },
            onEachFeature: onEachFeature // Add interaction listeners
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

// Function to assign a colour based on the price
function getColor(d) {
    return d > 1000000 ? '#800026' :
           d > 750000  ? '#BD0026' :
           d > 500000  ? '#E31A1C' :
           d > 250000  ? '#FC4E2A' :
           d > 100000  ? '#FD8D3C' :
           d > 50000   ? '#FEB24C' :
           d > 25000   ? '#FED976' :
                        '#FFEDA0';
}

// Highlight feature on mouseover
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();

    info.update(layer.feature.properties);
}

// Reset highlight on mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target); // Use the geojson layer to reset style
    info.update(); // Clear the info box
}


// Add interaction listeners to each feature
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

// Creating pop up
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

//method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>UK House Prices</h4>' +  (props ?
        '<b>' + props['LAD13NM'] + '</b><br />' + ' £' + props.price
        : 'Hover over a region');
};

info.addTo(map);

//Need arron to send json file with jobs and the average salary for the job.
// connect the salary input fields to the maximum house price
//Using maximum house price have the map dynamically change colour.
//use the maximum house price to dynamically fill the top houses table.
