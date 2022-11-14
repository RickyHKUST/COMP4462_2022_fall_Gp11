let privatehousingloc = [];
let privatemarkers = [];
const APIkey = "AIzaSyBr30gUlrpF5Qwhr4t0R_IrqmqKxHLB1IU";
const geocodeurl = "https://maps.googleapis.com/maps/api/geocode/json?address=";

let createprivatehousing = () => {
    let start = 1;
    let end = 95

    fetch("assets/data/housing/private.json")
        .then(response => response.json())
        .then(data => {

            for (start; start < end; start++) {
                let address = data[start]["Address"].replace(/\s/g, '+');
                let addressurl = geocodeurl + address + "&key=" + APIkey;
                let name = data[start]["Name of Building"];

                fetch(addressurl)
                    .then(response => response.json())
                    .then(data => {

                        let latitude = data.results[0].geometry.location.lat;
                        let longitude = data.results[0].geometry.location.lng;

                        privatehousingloc.push({
                            position: new google.maps.LatLng(latitude, longitude),
                            title: name,
                            type: "private housing"
                        });

                        const icon = {
                            url: "https://maps.google.com/mapfiles/kml/pal3/icon21.png",
                            scaledSize: new google.maps.Size(10, 10),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(0, 0)
                        };
                        privatemarkers.forEach(data => data.setMap(null));

                        privatehousingloc.forEach(location => {
                            marker = new google.maps.Marker({
                                position: location.position,
                                icon: icon,
                                map: map,
                                title: location.title
                            });

                            privatemarkers.push(marker);
                        })
                    })

                // if (start == end-1 && end < Object.keys(data).length) {
                //     start = end;
                //     end += end
                // }
            }
        })

        .catch (err => console.log(err))
}

$("#targetMonth")[0].addEventListener("change", createprivatehousing);
createprivatehousing();