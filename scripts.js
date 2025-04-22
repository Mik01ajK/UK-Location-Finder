//Main div container for job roles
//Creating option selector for the job roles
// two fields for average salary and maximum house price which will be calculated using a formula
// Finally a table that populatrs with 5 top areas based on average house price for the salary.






//initialising Uk map
var map = L.map('mapContainer', {
    center: [54.7, -2], // Center on Great Britain
    zoom: 3, // Set initial zoom level
    minZoom: 5.5, // Prevent zooming out too much
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

// Function to assign a colour based on the price and max house price
function getColor(d, maxHousePrice) {
    if (d > maxHousePrice * 1.5) {
        return '#ff0000'; // Bright red (significantly above max house price)
    } else if (d > maxHousePrice * 1.35) {
        return '#ff5733'; // Light red-orange (moderately above max house price)
    } else if (d > maxHousePrice * 1.2) {
        return '#ff8c1a'; // Orange (slightly above max house price)
    } else if (d > maxHousePrice) {
        return '#ffd633'; // Yellow-orange (just above max house price)
    } else if (d === maxHousePrice) {
        return '#80ff80'; // Green (exactly at max house price)
    } else {
        return '#33cc33'; // Dark green (below max house price)
    }
}

let isMapReady = false; // Flag to track if the map is ready

// Function to update the map colors dynamically
function updateMapColors() {
    const maxHousePrice = parseFloat(document.getElementById('maxHousePriceInput').value) || 0;

    //Update the GeoJSOn layer's style
    geojson.setStyle(function(feature) {
        return {
            fillColor: getColor(feature.properties.price, maxHousePrice), // Use maxHousePrice
            weight: 1,
            opacity: 1,
            color: "white",
            fillOpacity: 0.7
        };
    });
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
    const layer = e.target;

    // Reset the style using the current maxHousePrice
    layer.setStyle({
        weight: 1,
        opacity: 1,
        color: "white",
        fillOpacity: 0.7
    });

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



// Function to calculate max house price
function maxHouse() {
    const salary = parseFloat(document.getElementById('averageSalaryInput').value) || 0;
    const maxHousePrice = salary * 4.5; 
    document.getElementById('maxHousePriceInput').value = maxHousePrice.toFixed(2) || 0;
}

//Using maximum house price have the map dynamically change colour.
function calculateAndUpdateMap() {
    maxHouse(); // Calculate the max house price
    updateMapColors(); 
    isMapReady = true; // Enable map interactions
}

// Add an event listener to the "Calculate" button
document.getElementById('calculateButton').addEventListener('click', calculateAndUpdateMap);


//Need arron to send json file with jobs and the average salary for the job.
//use the maximum house price to dynamically fill the top houses table.
