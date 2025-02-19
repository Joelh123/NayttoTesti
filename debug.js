let map = L.map('map', { minZoom: 6, maxZoom: 19, maxBounds: [[59, 10],[73, 40]] }).setView([61.687879, 27.273147], 17)
let marker = L.marker([61.687879, 27.273147], { draggable: true }).addTo(map)
let mannerheimMarker = { isSet: false, func: L.circle([61.68789288044503, 27.272207983109546], {radius: 10}).addTo(map) }
let thresholdDistance = 20

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var CustomIcon = L.Icon.extend({
    options: {
        iconUrl: L.Icon.Default.prototype._getIconUrl('icon'),
        shadowUrl: L.Icon.Default.prototype._getIconUrl('shadow'),
        iconSize: [25, 41],
        shadowSize: [41, 41],
        iconAnchor: [12, 41],
        shadowAnchor: [12, 41],
        popupAnchor: [1, -34]
    }
});


let markers = [

]

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

function selectLocation(){
    let text = document.getElementById("text").value
    map.once('click', function(e){
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    addMarker(lat, lng, text);
    })
}

function addMarker(lat, lng, iconText){
    newMarker = { name: L.marker([lat, lng], {icon: new CustomIcon()}).addTo(map).bindPopup(iconText) }
    markers.push(newMarker)
};

getMarkerCoordinates();
setInterval(getMarkerCoordinates, 10000);

// Mannerheim
// lat
// : 
// 61.68789288044503
// lng
// : 
// 27.272207983109546