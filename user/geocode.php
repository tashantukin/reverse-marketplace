<!DOCTYPE html>
<html lang="en">


<head>

    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>




</head>

<body>

    <input type="text" id="my-address">
    <button id="getCords" onClick="codeAddress();">getLat&Long</button>

</body>


<script type="text/javascript"
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbYXf7DUOc-j2QwGgtXcFp4fpGMD4Q59o&libraries=places">
</script>
<script type="text/javascript">
function initialize() {
    var address = (document.getElementById('my-address'));
    var autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    });
}

function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("my-address").value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            alert("Latitude: " + results[0].geometry.location.lat());
            alert("Longitude: " + results[0].geometry.location.lng());
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
google.maps.event.addDomListener(window, 'load', initialize);
</script>

</html>