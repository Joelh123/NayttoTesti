let map = L.map('map', { minZoom: 6, maxZoom: 19, maxBounds: [[59, 10],[73, 40]] }).setView([61.687879, 27.273147], 17)
let marker = L.marker([61.687879, 27.273147], { draggable: true }).addTo(map)
let mannerheimMarker = L.circle([61.68789288044503, 27.272207983109546], {radius: 10}).addTo(map);
let thresholdDistance = 20

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getMarkerCoordinates(){
    console.log("Locating")
    map.locate({watch: true, enableHighAccuracy: true, timeout: 2000})
    map.once('locationfound', function(e) {
        console.log("Location found")
        if (marker) {
            console.log(marker.getLatLng())
            if(map.distance(marker.getLatLng(), mannerheimMarker.getLatLng()) <= thresholdDistance) {
                window.alert("patsas")
            map.stopLocate()
            }
        } else {
            map.stopLocate()
            marker = L.marker(e.latlng).bindPopup("Your current location").addTo(map);
        }
    });

    map.on('locationerror', function(e) {
        console.log("Location not found")
    });
};

getMarkerCoordinates();
setInterval(getMarkerCoordinates, 2000);

// Mannerheim
// lat
// : 
// 61.68789288044503
// lng
// : 
// 27.272207983109546