let privatehousingloc = [];
let privatemarkers = [];

let createprivatehousing = () => {
    d3.csv("assets/data/housing/private.csv", function (data) {

        data.forEach(privatehousing => {
            let latitude = privatehousing.lat;
            let longitude = privatehousing.lon;
            let name = privatehousing.original_Name_of_Building;

            privatehousingloc.push({
                position: new google.maps.LatLng(latitude, longitude),
                title: name,
                type: "private housing"
            });
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
        });
    })
}

$("#targetMonth")[0].addEventListener("change", createprivatehousing);
createprivatehousing();