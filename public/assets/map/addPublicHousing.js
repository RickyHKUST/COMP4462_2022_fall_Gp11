let publichousingloc = [];
let publicmarkers = [];

let createpublichousing = () => {
    fetch("assets/data/housing/public.json")
    .then(response => response.json())
    .then(data => {
        region = ($("[name='place-names'] ul li:visible").length!=0)?$("[name='place-names'] ul li:visible")[0].dataset.value:"Hong Kong"
		month = getFormattedMonth($('#timeline')[0].value)
        data.forEach(publichousing => {

            let year = month.substring(0,4)
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

function getFormattedMonth(offset) {
	const startMonth = 3;
	const startYear = 2021;
	month = (startMonth - 1 + parseInt(offset)) % 12 + 1;
	if (month < 10) { month = '0' + month; }
	year = Math.floor(startYear + ((2 + parseInt(offset)) / 12));
	return year + '-' + month;
}

$('#timeline').change(e=>createpublichousing())
$("#public").change(e=>createpublichousing())
createpublichousing('2021-03')