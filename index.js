let map = L.map('map', { minZoom: 6, maxZoom: 19, inertia: true, inertiaDeceleration: 20000 })
let userMarker = null;
let thresholdDistance = 40;
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
        title: 'Mikkelin Tori',
        name: L.marker([61.687879, 27.273147], {icon: new CustomIcon()}).addTo(map).bindPopup("Tori"),
        content: '<p>Mikkelin tori</p><br><img src="https://mikkelintoriparkki.fi/wp-content/uploads/Torikuva.jpg" alt="Kuva Mikkelin torista">',
        visited: false
    },
    {
        title: 'Korpi',
        name: L.marker([62.687879, 27.273147], {icon: new CustomIcon()}).addTo(map).bindPopup("Korpi"),
        content: '<p>Joku paikka</p>',
        visited: false
    },
    {
        title: 'Pikantti',
        name: L.marker([61.688658468886906, 27.269138538504908], {icon: new CustomIcon()}).addTo(map).bindPopup("Pikantti"),
        content: '<p>Pikantti</p><br><img src="https://lh3.googleusercontent.com/p/AF1QipNhvpDtqQrmz0R9tZNpHYZn2TDc_FuDr-q23Vg8=s680-w680-h510">',
        visited: false
    },
    {
        title: 'Naisvuori',
        name: L.marker([61.69217961815744, 27.272360698101572], {icon: new CustomIcon()}).addTo(map).bindPopup("Naisvuori"),
        content: '<p>Naisvuoren torni</p><br><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZjpwFzlF1udJbs5BS50n-JcNu26udRuWOQ&s">',
        visited: false
    }
]

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function selectLocation(){
    let text = document.getElementById("text").value
    let content = document.getElementById("text-content").value
    map.once('click', function(e){
        var coord = e.latlng;
        var lat = coord.lat;
        var lng = coord.lng;
        addMarker(lat, lng, text, content);
    })
}

function addMarker(lat, lng, iconText, contentText){
    newMarker = { name: L.marker([lat, lng], {icon: new CustomIcon()}).addTo(map).bindPopup(iconText), content: contentText }
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
        for (const marker of markers) {
            marker.name.on('click', function(ev){
                let latlng = map.mouseEventToLatLng(ev.originalEvent);
                let distance = Math.trunc(userMarker.getLatLng().distanceTo([latlng.lat, latlng.lng]));
                document.getElementById("selectedMarkerName").innerHTML = marker.title
                if (distance < 1000){
                    document.getElementById("selectedMarkerDistance").innerHTML = `${distance} meters`
                     console.log(`${distance} meters`);
                } else {
                    document.getElementById("selectedMarkerDistance").innerHTML = `${(distance / 1000).toFixed(1)}km`
                    console.log(`${(distance / 1000).toFixed(1)}km`);
                }
            });
        }
    }
};

function displayPopup() {
    for (const marker of markers) {
        if (map.distance(userMarker.getLatLng(), marker.name.getLatLng()) <= thresholdDistance) {
            L.popup(marker.name.getLatLng(), { content: marker.content ? marker.content : '<p>testi</p>', closeButton: false })
                .openOn(map);
        }
    }
}

getUserCoordinates();
setInterval(getUserCoordinates, 15000);
map.locate({ setView: true })