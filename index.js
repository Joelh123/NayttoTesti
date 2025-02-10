let map = L.map('map').setView([61.687879, 27.273147], 17)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getUserCoordinates(){
    map.locate({watch: true, enableHighAccuracy: true})
    map.on('locationfound', function(e) {
        let userMarker = L.marker(e.latlng).bindPopup("Your current location").addTo(map);
        stopLocate()
    });

    map.on('locationerror', function(e) {
        alert("Location not found")
    });
};

getUserCoordinates();