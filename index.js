let map = L.map('map', { minZoom: 6, maxZoom: 19 }).setView([61.687879, 27.273147], 17)
let userMarker = null


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getUserCoordinates(){
    console.log("Locating")
    map.locate({watch: true, enableHighAccuracy: true, timeout: 15000})
    map.once('locationfound', function(e) {
        console.log("Location found")
        if (userMarker) {
            map.stopLocate()
            userMarker.setLatLng(e.latlng);
        } else {
            map.stopLocate()
            userMarker = L.marker(e.latlng).bindPopup("Your current location").addTo(map);
        }
    });

    map.on('locationerror', function(e) {
        console.log("Location not found")
    });
};
getUserCoordinates();
setInterval(getUserCoordinates, 15000);
