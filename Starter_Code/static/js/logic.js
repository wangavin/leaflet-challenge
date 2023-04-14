// ***Create Map location***
// var myMap = L.map("map", {
//     center: [37.7749, -122.4194],
//     zoom: 4
//   });
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
});

//   ***Add layer*** 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href=https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors'
}).addTo(myMap);

// ***Earthquake data from link***
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// ***Take the GeoJSON Earthquake data***
d3.json(url).then((data) => {
    var features = data.features;

    L.geoJSON(features, {
        pointToLayer: drawCircle,
        onEachFeature: bindPopUp
    }).addTo(myMap);

    // ***create colors for the circles in different depth***
    function colorInRanage(depth) {
        return depth >= 90 ? "gray" :
            depth < 90 && depth >= 70 ? "red" :
                depth < 70 && depth >= 50 ? "pink" :
                    depth < 50 && depth >= 34 ? "blue" :
                        depth < 33 && depth >= 10 ? "yellow" :
                            "green";
    }

    // ***Make circles on the map***
    function drawCircle(circles, latlng) {
        let depth = circles.geometry.coordinates[2];
        return L.circle(latlng, {
            radius: circles.properties.mag * 15000,
            fillOpacity: 0.25,
            color: colorInRanage(depth),
            fillColor: colorInRanage(depth),
        })
    }

    // Pop up information setup
    function bindPopUp(feature, layer) {
        layer.bindPopup(`Location: ${feature.properties.place} <br> Magnitude: ${feature.properties.mag} <br> Depth: ${feature.geometry.coordinates[2]}`);
    }

    // Define the colors and labels 
    var colors = ["gray", "red", "pink", "blue", "yellow", "green"];
    var labels = ["90+ km", "70-90 km", "50-70 km", "34-50 km", "10-34 km", "<10 km"];

    // set list on bottom right conner 
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        // Create a div element for the legend
        var div = L.DomUtil.create('div', 'legend');

        // Add legend title
        div.innerHTML += '<h3>Depth (km)</h3>';

        // Loop through the colors and labels, and add a row for each one
        for (var i = 0; i < colors.length; i++) {
            div.innerHTML += '<div class="legend-row"><div class="legend-color" style="background-color: ' + colors[i] + '"></div><div class="legend-label">' + labels[i] + '</div></div>';
        }

        return div;
    };
   
    legend.addTo(myMap);
});
