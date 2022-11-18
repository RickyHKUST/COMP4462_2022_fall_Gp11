let buscount = 0;
let minibuscount = 0;
let lightrailcount = 0;
let mtrcount = 0;
let transport = [];

let infowindowarr = [];

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

        infowindowarr.push([infowindow, circle]);
    })
}

let showTotalStops = (house_marker) => {
    let slider = $("#slider");
    let output = $("#m_value");

    let house_lat = house_marker.position.lat();
    let house_lng = house_marker.position.lng();

    let busMarkers = [];
    let minibusMarkers = [];
    let transport = [lighRailMarkers, mtrMarkers, busStopLocation, minibusStopLocation]
    console.log(busStopLocation);
    console.log(minibusStopLocation);
    // if (!transport.includes((lighRailMarkers, mtrMarkers))) {transport.push(lighRailMarkers, mtrMarkers)}

    meter = $("#slider")[0].value;

    // for (let i in $("input[name='selectTypesBus']:checked")){
    //     switch ($("input[name='selectTypesBus']:checked")[i].value) {
    //     case "busStop":
    //         if (transport.length == 3) {
    //             let temp = transport[2];
    //             if (transport[2].length > 5000) {
    //                 transport.push(transport[2].filter((item, index), transport[2].indexOf(item) !== index));
    //                 transport[2] = transport[2].filter((item, index), transport[2].indexOf(item) === index);
    //             }
    //         }   
    //         else if (transport.length == 4) {
    //                 if (transport[2] == transport[3]) {
    //                     transport[2] = transport[2].filter((item, index), transport[2].indexOf(item) === index);
    //                 }
    //         }
            
    //         else {
    //             busMarkers = markers
    //             transport.push(busMarkers)
    //             console.log(transport)
    //         }
    //         break;
    //     case "miniBusStop":
    //         console.log("MBUS")
    //         minibusMarkers = markers
    //         console.log(busMarkers)
    //         if (busMarkers.length != 0) {
    //             console.log("in");
    //             minibusMarkers = minibusMarkers.filter(x => busMarkers.indexOf(x) == -1)
    //         }
    //         transport.push(minibusMarkers)
    //         console.log("iner mbus") 
    //         console.log(minibusMarkers)
    //         console.log(transport);
    //         break;
    //     }
    // }

    transport.forEach(t => {
        count = counting(house_lat, house_lng, meter, t);

        switch (t) {
            case busStopLocation:
                buscount = count;
                break;
            case minibusStopLocation:
                minibuscount = count;
                break;
            case lighRailMarkers:
                lightrailcount = count;
                break;
            case mtrMarkers:
                mtrcount = count;
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

        if (result) {++count;}
    })
    return count;
}