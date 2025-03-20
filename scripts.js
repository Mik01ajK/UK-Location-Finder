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
    zoomControl: false, // Disable zoom controls
    dragging: false, // Disable dragging
    scrollWheelZoom: false, // Disable zooming with the mouse wheel
    doubleClickZoom: false, // Disable zooming by double-click
    touchZoom: false // Disable zooming on touchscreens
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

fetch('data/uk_boundaries.json')
.then(response => response.json())
.then(data => {
    L.geoJson(data, {
        style: function(feature) {
            return {
                fillColor: "#36454F",  // Placeholder color
                weight: 1,
                opacity: 1,
                color: "white",
                fillOpacity: 0.7
            };
        }
    }).addTo(map);
});