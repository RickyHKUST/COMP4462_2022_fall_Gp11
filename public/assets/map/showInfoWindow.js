let buscount = 0;
let meter = 0;

let showInfoWindow = (marker, name) => {

    let infowindow = new google.maps.InfoWindow()

    google.maps.event.addListener(marker, "click", function () {
        showTotalBusStops(marker);
        infowindow.setContent(
            "<h3>" + name + "</h3>" +
            "<p>Nearby Bus Stops (" + meter + "m): " + buscount + "</p>" +
            "<p>Nearby Minibus Stops (" + meter + "m): " + "count" + "</p>" +
            "<p>Nearby Lightrail Station (" + meter + "m): " + "count" + "</p>" +
            "<p>Nearby MTR Stations (" + meter + "m): " + "count" + "</p>"

        )
        infowindow.open(marker.map, marker)
        setTimeout(() => {infowindow.close()}, 10000);
    })
}

let showTotalBusStops = (house_marker) => {
    let slider = $("#slider");
    let output = $("#m_value");

    let house_lat = house_marker.position.lat()
    let house_lng = house_marker.position.lng()

    //dynamic?

    slider
    .ready(function() {
        meter = slider[0].value;
        counting(house_lat, house_lng, meter)
    })
    .on("input", function() {
        output.html(slider[0].value)
    })
    .on("change", function() { 
        meter = slider[0].value;
        counting(new_lat, new_long, house_lat, house_lng, meter);
    })

}

let counting = (house_lat, house_lng, meter, transportloc) => {
    
    buscount = 0;

    busStopLocation.forEach(element => {
        //get every stop's location
        let bus_lat = element.position.lat()
        let bus_lng = element.position.lng();

        //check if the stop(s) is/are between the area
        let ky = 40000 / 360;
        let kx = Math.cos(Math.PI * house_lat / 180.0) * ky;
        let dx = Math.abs(house_lng - bus_lng) * kx;
        let dy = Math.abs(house_lat - bus_lat) * ky;

        let result = Math.sqrt(dx * dx + dy * dy) <= (meter/1000)

        if (result) {++buscount;}
    })
}