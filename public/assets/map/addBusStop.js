//this is a tool for converting HK1980 Grid coordinate to WGS84 degree supported by google map
proj4.defs('EPSG:2326', '+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs');

//After a time is selected, import corresponding csv by d3 and display the bus stop on map
var markers = []; // to manipulate the markers after created
//clear this array when option changed
var busStopLocation = []; //an array to store the bus stop location (latitude, longitude)
var minibusStopLocation = [];

// var clusterMarkers = new markerClusterer.MarkerClusterer({
// 	map,
// 	markers
// });

// let kMeans = (data, clusters) => {
// 	let groups = []
// 	let centroids = []
// 	let oldCentroids = []
// 	let changed = false

// 	let count = 0

// 	for (let initGroups = 0; initGroups < clusters; initGroups++) {
// 		groups[initGroups] = []
// 	}

// 	let initialCentroids = Math.round(data.length / (clusters + 1))

// 	for (let i = 0; i < clusters; i++) {
// 		centroids[i] = data[initialCentroids * (i + 1)]
// 	}
// 	console.log(groups)

// 	console.log(centroids)

// 	do {
// 		for (let j = 0; j < clusters; j++) {
// 			groups[j] = []
// 		}

// 		changed = false

// 		let newGroup = -1

// 		for (let i = 0; i < data.length; i++) {
// 			let distance = -1
// 			let oldDistance = -1

// 			for (let j = 0; j < clusters; j++) {
// 				distance = Math.sqrt(Math.pow(centroids[j][0] * 1000 - data[i][0] * 1000, 2) + Math.pow(centroids[j][1] * 1000 - data[i][1] * 1000, 2))
// 				console.log(data[i] + ' and ' + centroids[j] + ' : ' + distance)

// 				if (oldDistance == -1) {
// 					oldDistance = distance
// 					newGroup = j
// 				}
// 				else if (distance <= oldDistance) {
// 					newGroup = j
// 					oldDistance = distance
// 				}
// 			}

// 			if (newGroup != -1) {
// 				groups[newGroup].push(data[i])
// 			}
// 		}

// 		// oldCentroids = centroids

// 		// for (let j = 0; j < clusters; j++) {
// 		// 	let total = 0
// 		// 	let newCentroid = 0

// 		// 	for (let i = 0; i < groups[j].length; i++) {
// 		// 		total += groups[j][i]
// 		// 	}

// 		// 	if (newGroup != -1) {
// 		// 		newCentroid = total / groups[newGroup].length
// 		// 	}

// 		// 	centroids[j] = newCentroid
// 		// }

// 		// for (let j = 0; j < clusters; j++) {
// 		// 	if (centroids[j] != oldCentroids[j]) {
// 		// 		changed = true
// 		// 	}
// 		// }

// 		// count++
// 	}
// 	while (changed == true && count < 1)

// 	return groups
// }

let renderBusStop = () => {

	busStopLocation = []; //clear this array when option changed
	minibusStopLocation = [];
	//use d3 to read the csv according to the name of selected date

	//Now you can use 'data' variable as an array of objects

	markers.forEach(data => data.setMap(null));
	// clusterMarkers.clearMarkers();
	// markers = []; 


	//get and store the values of the checkboxs selected 
	$.each($("input[name='selectTypesBus']:checked"), function () {

		region = ($("[name='place-names'] ul li:visible").length!=0)?$("[name='place-names'] ul li:visible")[0].dataset.value:"Hong Kong"
		month = getFormattedMonth($('#timeline')[0].value)

		var busType = $(this).val();
		//use d3 to read the csv according to the name of selected date
		d3.csv("assets/data/" + $(this).val() + "/" + month + ".csv", function (data) {
			//Now you can use 'data' variable as an array of objects

			/*There are many row, each contains a XY coordinate.
			 However, this XY is using HK1980 Grid coordinate(not supported by google), 
			 so here we convert it to WGS84 degree
			 After that we use an array to store the result
			*/
			// let processedData = []

			geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': region }, function (results, status) {
				if (status == 'OK') {
					regionLatLng = results[0].geometry.location
					data.forEach(busStop => {
						[longitude, latitude] = proj4('EPSG:2326', 'EPSG:4326', [parseInt(busStop.X), parseInt(busStop.Y)]);

						// processedData.push([longitude, latitude])


						//push the objects one by one
						busPosition = new google.maps.LatLng(latitude, longitude)
						distance = google.maps.geometry.spherical.computeDistanceBetween(regionLatLng, busPosition)

						if (distance < 5000 || region === 'Hong Kong') {
							if (busType == "busStop")
								//push the objects one by one
								busStopLocation.push({
									position: busPosition,
									type: "bus",
								});
							else if (busType == "miniBusStop")
								//push the objects one by one
								minibusStopLocation.push({
									position: busPosition,
									type: "minibus",
								});

							// busStopLocation.push({
							// 	position: busPosition,
							// 	type: "bus",
							// });
						}

					})

					// console.log(kMeans(processedData, 10))

					// Create the icon of the markers.
					// some icon provided by google: http://kml4earth.appspot.com/icons.html
					var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';  //can use or not use

					const icon = {
						url: month == "2022-11" ? "http://maps.google.com/mapfiles/ms/icons/red-pushpin.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // url (local icon)
						scaledSize: new google.maps.Size(10, 10), // scaled size
						origin: new google.maps.Point(0, 0), // origin
						anchor: new google.maps.Point(0, 0) // anchor
					};



					//add marker to the array of busStopLocation
					busStopLocation.forEach(location => {
						marker = new google.maps.Marker({
							position: location.position,
							//icon: iconBase + 'parking_lot_maps.png',
							icon: icon,
							map: map,
						});
						markers.push(marker);//store the marker for next time renew (see setMap(null)); otherwise it will exist forever


					}) //end of for loop

					//add marker to the array of miniBusStopLocation
					minibusStopLocation.forEach(location => {
						marker = new google.maps.Marker({
							position: location.position,
							//icon: iconBase + 'parking_lot_maps.png',
							icon: icon2,
							map: map,
						});
						markers.push(marker);//store the marker for next time renew (see setMap(null)); otherwise it will exist forever

					}) //end of for loop	
				} else {
					console.log(status);
				}
			})



			const icon2 = {
				url: month == "2022-11" ? "http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png" : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // url (local icon)
				scaledSize: new google.maps.Size(10, 10), // scaled size
				origin: new google.maps.Point(0, 0), // origin
				anchor: new google.maps.Point(0, 0) // anchor
			};
		})
	});
}

// 	});
// }

function getFormattedMonth(offset) {
	const startMonth = 3;
	const startYear = 2021;
	month = (startMonth - 1 + parseInt(offset)) % 12 + 1;
	if (month < 10) { month = '0' + month; }
	year = Math.floor(startYear + ((2 + parseInt(offset)) / 12));
	return year + '-' + month;
}

$('#timeline').on('input', e=>renderBusStop())
$('#timeline').change(e=>renderBusStop())
$('input').change(e=>renderBusStop())

renderBusStop()
