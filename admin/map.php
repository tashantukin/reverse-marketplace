<!DOCTYPE html>
<html>

<head>
    <title>Leaflet GeoJSON Example</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin="" />
    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""></script>
    <script type="text/javascript" src="https://bootstrap.arcadier.com/spacetime/js/jquery-min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/geojson/0.2.0/geojson.js"
        integrity="sha512-pE/bFDMNll0zY2drKmoPbSXsCxxjd8QxFwsh171iKvRtdOfOefP+HZVID5xq4/KjTMwl99kP0yA94voae6zYRA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <style type="text/css">
    .leaflet-container {
        background-color: #c5e8ff;
    }
    </style>
</head>

<body>
    <div id="map" style="width: 600px; height: 400px"></div>

    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <!-- <script src="https://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js"></script> --> -->
    <script>
    // var myGeoJSONPath = 'scripts/asia.json';
    var myCustomStyle = {
        stroke: false,
        fill: true,
        fillColor: '#fff',
        fillOpacity: 1
    }
    $.getJSON(myGeoJSONPath, function(data) {
        var map = L.map('map').setView([39.74739, -105], 4);

        L.geoJson(data, {
            clickable: false,
            style: myCustomStyle
        }).addTo(map);
    })
    </script>
</body>

</html>