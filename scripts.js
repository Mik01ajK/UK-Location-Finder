
//initialising Uk map
var map = L.map('mapContainer').setView([54.5,-3], 6); //Centered on UK

//Add a tile layer (background map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch('data/uk_boundaries.json')
.then(response => response.json())
.then(data => {
    L.geoJson(data, {
        style: function(feature) {
            return {
                fillColor: "#ff7800",  // Placeholder color
                weight: 1,
                opacity: 1,
                color: "white",
                fillOpacity: 0.7
            };
        }
    }).addTo(map);
});