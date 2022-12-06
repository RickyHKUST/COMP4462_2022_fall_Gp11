let buscount = 0;
let minibuscount = 0;
let lightrailcount = 0;
let mtrcount = 0;
let transport = [];

let infowindowarr = [];
let slider = $("#slider");
let output = $("#m_value");

let showInfoWindow = (marker, name) => {
    const delay = 10000;

    google.maps.event.addListener(marker, "click", function () {
        if (infowindowarr.length > 2) {
            infowindowarr[0][0].set("marker", null);
            infowindowarr[0][0].close();
            infowindowarr[0][1].setMap(null);
            infowindowarr.shift();
        }

        let infowindow = new google.maps.InfoWindow()
        let circle = new google.maps.Circle({
            strokeColor: "#00FF00",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#00FF00",
            fillOpacity: 0.35,
            map,
            center: {"lat": marker.position.lat(), "lng": marker.position.lng()},
            radius: parseInt($("#slider")[0].value),
        })

        showTotalStops(marker);
        infowindow.setContent(
            "<h3>" + name + "</h3>" +
            "<p>Nearby Bus Stops (" + meter + "m): " + buscount + "</p>" +
            "<p>Nearby Minibus Stops (" + meter + "m): " + minibuscount + "</p>" +
            "<p>Nearby MTR Stations (" + meter + "m): " + mtrcount + "</p>" +
            "<p>Nearby Lightrail Station (" + meter + "m): " + lightrailcount + "</p>"
        )

        infowindow.open(marker.map, marker)
        setTimeout(() => {
            infowindow.close();
            circle.setMap(null);
        }, delay);
        
        //circle will be disappeared when mannually close the infowindow
        infowindow.addListener("closeclick", () => {
            circle.setMap(null);
        });

        infowindowarr.push([infowindow, circle]);
    })
}

let showTotalStops = (house_marker) => {

    let house_lat = house_marker.position.lat();
    let house_lng = house_marker.position.lng();

    let transport = [lighRailMarkers, mtrMarkers, busStopLocation, minibusStopLocation]

    meter = $("#slider")[0].value;

    transport.forEach(t => {
        count = counting(house_lat, house_lng, meter, t);

        switch (t) {
            case busStopLocation: buscount = count;
                break;
            case minibusStopLocation: minibuscount = count;
                break;
            case lighRailMarkers: lightrailcount = count;
                break;
            case mtrMarkers: mtrcount = count;
                break;
        }
    })

    slider
    .on("input", function() {
        output.html(slider[0].value)
    })
    .on("change", function() { 
        meter = slider[0].value;
    })
}

let counting = (house_lat, house_lng, meter, transportloc) => {

    count = 0;

    transportloc.forEach(element => {
        //get every stop's location
        let lat = element.position.lat()
        let lng = element.position.lng();

        //check if the stop(s) is/are between the area
        let ky = 40000 / 360;
        let kx = Math.cos(Math.PI * house_lat / 180.0) * ky;
        let dx = Math.abs(house_lng - lng) * kx;
        let dy = Math.abs(house_lat - lat) * ky;

        let result = Math.sqrt(dx * dx + dy * dy) <= (meter/1000)

        if (result) ++count;
    })
    return count;
}

slider.on("change", function() {
    output.html(slider[0].value)
})