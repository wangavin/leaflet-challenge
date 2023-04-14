// ***Create Map location***
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 4
  });
//   var myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 4
//   });

//   ***Add layer*** 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href=https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors'
}).addTo(myMap);

// ***create colors for the circles in different depth***
function getColor(depth) {
    return depth >= 90 ? "gray" :
        depth < 90 && depth >= 70 ? "red" :
        depth < 70 && depth >= 50 ? "pink" :
        depth < 50 && depth >= 30 ? "blue" :
        depth < 30 && depth >= 10 ? "yellow" :
                                    "green";
}

// ***Make circles on the map***
function drawCircle(point, latlng) {
    let mag = point.properties.mag;
    let depth = point.geometry.coordinates[2];
    return L.circle(latlng, {
            fillOpacity: 0.25,
            color: getColor(depth),
            fillColor: getColor(depth),
            // The size of the circle is based on ""mag:""
            radius: mag * 15000
    })
}

// Displaying info when the feature is clicked
function bindPopUp(feature, layer) {
    layer.bindPopup(`Location: ${feature.properties.place} <br> Magnitude: ${feature.properties.mag} <br> Depth: ${feature.geometry.coordinates[2]}`);
}

// The link to get the Earthquak GeoJSON data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Getting the GeoJSON data
d3.json(url).then((data) => {
    var features = data.features;

    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(features, {
        pointToLayer: drawCircle,
        onEachFeature: bindPopUp
    }).addTo(myMap);

    // Setting up the legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = () => {
        var div = L.DomUtil.create('div', 'info legend');
        grades = [-10, 10, 30, 50, 70, 90];

        // Looping through our intervals and generating a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);
});
