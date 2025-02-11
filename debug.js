let map = L.map('map', { minZoom: 6, maxZoom: 19 }).setView([61.687879, 27.273147], 17)
let marker = L.marker([61.687879, 27.273147], { draggable: true }).addTo(map)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getMarkerCoordinates(){
    console.log("Locating")
    map.locate({watch: true, enableHighAccuracy: true, timeout: 15000})
    map.once('locationfound', function(e) {
        console.log("Location found")
        if (marker) {
            console.log(marker._latlng)
            map.stopLocate()
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