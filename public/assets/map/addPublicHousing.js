let publichousingloc = [];
let publicmarkers = [];

let createpublichousing = () => {
    fetch("assets/data/housing/public.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(publichousing => {

            let year = $("#targetMonth")[0].value.substring(0,4)
            let yearofintake = publichousing["Year of Intake"]["en"].substring(0,4)
            
            if (parseInt(yearofintake) < parseInt(year)) {
                let latitude = publichousing["Estate Map Latitude"];
                let longitude = publichousing["Estate Map Longitude"];
                let name = publichousing["Estate Name"]["en"];

                publichousingloc.push({
                    position: new google.maps.LatLng(latitude, longitude),
                    title: name,
                    type: "public housing"
                });
            }
        });

        const icon = {
            url: "https://maps.google.com/mapfiles/kml/pal3/icon56.png",
            scaledSize: new google.maps.Size(10, 10),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(5, 5)
        };

        if (!($("#public").prop("checked"))){
            publicmarkers.forEach(data => data.setMap(null));
        }
        else {
            publichousingloc.forEach(location => {
                marker = new google.maps.Marker({
                    position: location.position,
                    icon: icon,
                    map: map,  
                });

                showInfoWindow(marker, location.title);

                publicmarkers.push(marker);
            });
        }
    });

    publichousingloc = []
}

$("#targetMonth")[0].addEventListener("change", createpublichousing);

$("#public").change(function() {
    createpublichousing()
})

createpublichousing()