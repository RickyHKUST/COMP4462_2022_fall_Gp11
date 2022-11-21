var lighRailMarkers = []; // to manipulate the markers after created

function hideShowlightRail() {

    const hidelightRail = {
        url: "assets/map/icons/hide2.png", // url (local icon)
        scaledSize: new google.maps.Size(14, 14), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(7, 7) // anchor
    };

    const showlightRail = {
        url: "http://maps.google.com/mapfiles/ms/icons/rail.png", // url (local icon)
        scaledSize: new google.maps.Size(25, 25), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(12, 12) // anchor
    };

    lighRailMarkers.forEach(data => data.setMap(null));
    lighRailMarkers = [];

    if ($("#lightRail").is(':checked')) {
        //use d3 to read the csv according to the name of selected date
        d3.csv("assets/data/mtrStations/geocodedLightRail.csv", function (data) {

            data.forEach(data => {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data.lat, data.lon),
                    icon: showlightRail,
                    map: map,

                });

                lighRailMarkers.push(marker);//store the marker for next time renew (see setMap(null)
            });

        });
    }
    else {
        if(map.getZoom()>12){
        //use d3 to read the csv according to the name of selected date
        d3.csv("assets/data/mtrStations/geocodedLightRail.csv", function (data) {

            data.forEach(data => {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data.lat, data.lon),
                    icon: hidelightRail,
                    map: map,

                });

                lighRailMarkers.push(marker);//store the marker for next time renew (see setMap(null)
            });

        });

        }

    }


}

$("#place-names").on("change",hideShowlightRail);

$('input[name=selectTypeslightRail]').change(hideShowlightRail);
