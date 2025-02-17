let map = L.map('map', { minZoom: 6, maxZoom: 19, inertia: true, inertiaDeceleration: 20000 }).setView([61.687879, 27.273147], 17)
let userMarker = null
var bounds = L.latLngBounds(
    L.latLng(59.5, 19.0),
    L.latLng(70.5, 31.5)
);


map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".button-action");
    button.addEventListener("click", checkDistance());
});

//For custom icon replace Icon with icon and remove iconUrl
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

//var customIcon1 = new CustomIcon({iconUrl: 'YOUR ICON IMAGE HERE'}), for custom icon images
var customIcon1 = new CustomIcon(),
    customIcon2 = new CustomIcon();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getUserCoordinates(){
    console.log("Locating")
    map.locate({enableHighAccuracy: true, timeout: 15000})
    map.once('locationfound', function(e) {
        console.log("Location found");
        if (userMarker) {
            userMarker.setLatLng(e.latlng);
        } else {
            userMarker = L.marker(e.latlng).bindPopup("Your current location").addTo(map);
        }
        //checkDistance();
    });  
    };

    map.once('locationerror', function(e) {
        console.log("Location not found")
});


function checkDistance(){
    alert("Test")
        if (userMarker) {
            let distance = userMarker.getLatLng().distanceTo(marker1.getLatLng());
            console.log(distance);
        }
    }


let marker1 = L.marker([61.687879, 27.273147], {icon: customIcon1}).addTo(map).bindPopup("Test icon");
let marker2 = L.marker([62.687879, 27.273147], {icon: customIcon2}).addTo(map).bindPopup("Test icon");



getUserCoordinates();
setInterval(getUserCoordinates, 15000);
console.log(userMarker)


