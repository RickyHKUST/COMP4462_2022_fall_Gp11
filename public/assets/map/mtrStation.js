var mtrMarkers = []; // to manipulate the markers after created

function hideShowMtrStations() {

    const hideMtr = {
        url: "assets/map/icons/hide.png", // url (local icon)
        scaledSize: new google.maps.Size(16, 16), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(8, 8) // anchor
    };

    const showMtr = {
        url: "assets/map/icons/mtr.png", // url (local icon)
        scaledSize: new google.maps.Size(20, 20), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(10, 10) // anchor
    };

    mtrMarkers.forEach(data => data.setMap(null));
    mtrMarkers = [];

    if ($("#mtr").is(':checked')) {
        //use d3 to read the csv according to the name of selected date
        d3.csv("assets/data/mtrStations/geocodedMtr.csv", function (data) {

            data.forEach(data => {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data.lat, data.lon),
                    icon: showMtr,
                    map: map,

                });

                mtrMarkers.push(marker);//store the marker for next time renew (see setMap(null)
            });

        });
    }
    else {
        if (map.getZoom() > 12) {
            //use d3 to read the csv according to the name of selected date
            d3.csv("assets/data/mtrStations/geocodedMtr.csv", function (data) {

                data.forEach(data => {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(data.lat, data.lon),
                        icon: hideMtr,
                        map: map,

                    });

                    mtrMarkers.push(marker);//store the marker for next time renew (see setMap(null)
                });

            });

        }

    }


}

$("#place-names").on("change", hideShowMtrStations);

$('input[name=selectTypesMtr]').change(hideShowMtrStations);
