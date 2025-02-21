let map = L.map('map', { minZoom: 6, maxZoom: 19, inertia: true, inertiaDeceleration: 20000 }).setView([61.687879, 27.273147], 17);
let userMarker = null;
let thresholdDistance = 20;
var bounds = L.latLngBounds(
    L.latLng(59.5, 19.0),
    L.latLng(70.5, 31.5)
);

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
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

let markers = [
    {
        name: L.marker([61.687879, 27.273147], {icon: new CustomIcon()}).addTo(map).bindPopup("Test icon"),
        content: 'Mikkelin tori' 
    },
    { 
        name: L.marker([62.687879, 27.273147], {icon: new CustomIcon()}).addTo(map).bindPopup("Test icon"),
        content: 'Joku paikka' 
    }
]

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
        displayPopup()
        checkDistance();
    });  
    };

    map.once('locationerror', function(e) {
        console.log("Location not found")
});

function checkDistance(){
    if (userMarker) {
        let distance = Math.trunc(userMarker.getLatLng().distanceTo(markers[0].name.getLatLng()));
        if (distance <= 1000){
            console.log(`${distance} meters`);
        } else {
            console.log(`${(distance / 1000).toFixed(1)}km`);
        }
    }
};

function displayPopup() {
    for (const marker of markers) {
        if (map.distance(userMarker.getLatLng(), marker.name.getLatLng()) <= thresholdDistance) {
            L.popup(marker.name.getLatLng(), { content: marker.content ? `<p>${marker.content}</p>` : 'testi', closeButton: false })
                .openOn(map);
        }
    }
}

getUserCoordinates();
addMarker(61.687879, 27.273147, "New custom marker")
setInterval(getUserCoordinates, 15000);