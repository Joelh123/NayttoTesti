let map = L.map('map').setView([61.687879, 27.273147], 17)
let userMarker = null


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getUserCoordinates(){
    console.log("Locating")
    map.locate({watch: true, enableHighAccuracy: true, timeout: 10000})
    map.on('locationfound', function(e) {
        console.log("Location found")
        if (userMarker) {
            userMarker.setLatLng(e.latlng);
        } else {
            userMarker = L.marker(e.latlng).bindPopup("Your current location").addTo(map);
        }
    });

    map.on('locationerror', function(e) {
        console.log("Location not found")
    });
};

setInterval(getUserCoordinates, 15000);
