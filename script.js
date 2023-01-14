var circle;
var map;

function initMap() {
    var centerCoordinates = new google.maps.LatLng(37.6, -95.665);
    map = new google.maps.Map(document.getElementById('map'), {
        center: centerCoordinates,
        zoom: 4
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');

    var infowindowContent = document.getElementById('infowindow-content');

    //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(infowindowContent);

    var marker = new google.maps.Marker({
        map: map
    });


    circle = new google.maps.Circle({
        map: map,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        center: centerCoordinates,
        radius: 10 * 1609.34,

    });

    autocomplete.addListener('place_changed', function() {
        document.getElementById("location-error").style.display = 'none';
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            document.getElementById("location-error").style.display = 'inline-block';
            document.getElementById("location-error").innerHTML = "Cannot Locate '" + input.value + "' on map";
            return;
        }

        map.fitBounds(place.geometry.viewport);
        marker.setPosition(place.geometry.location);
        circle.setCenter(place.geometry.location);
        marker.setVisible(true);
        circle.setVisible(true);

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = input.value;
        infowindow.open(map, marker);
    });
}

function updateRadius() {
    circle.setRadius(document.getElementById('radius').value * 1609.34);
    map.fitBounds(circle.getBounds());
}