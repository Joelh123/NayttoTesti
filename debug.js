let map = L.map('map', { minZoom: 6, maxZoom: 19, maxBounds: [[59, 10],[73, 40]] }).setView([61.687879, 27.273147], 17)
let marker = L.marker([61.687879, 27.273147], { draggable: true }).addTo(map)
let mannerheimMarker = { isSet: false, func: L.circle([61.68789288044503, 27.272207983109546], {radius: 10}).addTo(map) }
let thresholdDistance = 20

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getMarkerCoordinates(){
    console.log("Locating")
    map.locate({ enableHighAccuracy: true, timeout: 10000})
    map.once('locationfound', function(e) {
        console.log("Location found")
        if (marker) {
            console.log(marker.getLatLng())
            map.stopLocate()
        } else {
            map.stopLocate()
            marker = L.marker(e.latlng).bindPopup("Your current location").addTo(map);
        }
    });

    displayPopup()

    map.on('locationerror', function(e) {
        console.log("Location not found")
    });
};

function displayPopup() {
    if(map.distance(marker.getLatLng(), mannerheimMarker.func.getLatLng()) <= thresholdDistance && !mannerheimMarker.isSet) {
        let popup = L.popup(mannerheimMarker.func.getLatLng(), { content: '<p>Mannerheimin patsas</p>', closeButton: false })
                    .openOn(map);
        mannerheimMarker.isSet = true
    } else if (map.distance(marker.getLatLng(), mannerheimMarker.func.getLatLng()) > thresholdDistance) {
        mannerheimMarker.isSet = false
    }
}

getMarkerCoordinates();
setInterval(getMarkerCoordinates, 10000);

// Mannerheim
// lat
// : 
// 61.68789288044503
// lng
// : 
// 27.272207983109546