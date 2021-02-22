var myMap = L.map("map", {
    center: [32.7767, -96.7970 ],
    zoom: 4
});
  
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url, function(response){
    

    for (var i = 0; i<response.features.length; i++) {
        var properties = response.features[i].properties;
        var geometry = response.features[i].geometry;
        var magnitude = properties.mag;
        var depth = geometry.coordinates[2];

        
        var color = "";
        if (depth <= 10 ) {
            color = "#00ff00";
        }
        else if ((depth > 10) && (depth < 30)) {
            color = "yellow";
        }
        else if ((depth >= 30) && (depth < 50))  {
            color = "#e6bf00";
        }
        else if ((depth >= 50) && (depth < 70)) {
            color = "orange";
        }
        else if ((depth >= 70) && (depth < 90)) {
            color = "#ff6a4d";
        }
        else {
            color = "red";
        }

        
        L.circle([geometry.coordinates[1], geometry.coordinates[0]], {
            stroke: false,
            fillOpacity: 0.5,
            color: "black",
            fillColor: color,
            radius: magnitude * 10000
        }).bindPopup("<h1>" + properties.place + "</h1><hr><p>" + new Date(properties.time) + "</p><br><p>Magnitude: " + magnitude +"</p><br><p> Depth: " + depth +"</p>").addTo(myMap)
        



    }
    

});
