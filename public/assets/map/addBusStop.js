//this is a tool for converting HK1980 Grid coordinate to WGS84 degree supported by google map
proj4.defs('EPSG:2326', '+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs');

//After a time is selected, import corresponding csv by d3 and display the bus stop on map
var markers = []; // to manipulate the markers after created
//clear this array when option changed
var busStopLocation = []; //an array to store the bus stop location (latitude, longitude)
var miniBusStopLocation = []; //an array to store the bus stop location (latitude, longitude)

let renderBusStop = (month) => {

	busStopLocation = []; //clear this array when option changed
	miniBusStopLocation = [];
	//use d3 to read the csv according to the name of selected date

	//Now you can use 'data' variable as an array of objects

	markers.forEach(data => data.setMap(null));

	//get and store the values of the checkboxs selected 
	$.each($("input[name='selectTypesBus']:checked"), function () {

		var busType = $(this).val();
		//use d3 to read the csv according to the name of selected date
		d3.csv("assets/data/" + $(this).val() + "/" + $("#targetMonth")[0].value + ".csv", function (data) {
			//Now you can use 'data' variable as an array of objects

			/*There are many row, each contains a XY coordinate.
			 However, this XY is using HK1980 Grid coordinate(not supported by google), 
			 so here we convert it to WGS84 degree
			 After that we use an array to store the result
			*/
			data.forEach(busStop => {
				[longitude, latitude] = proj4('EPSG:2326', 'EPSG:4326', [parseInt(busStop.X), parseInt(busStop.Y)]);


				if (busType == "busStop")
					//push the objects one by one
					busStopLocation.push({
						position: new google.maps.LatLng(latitude, longitude),
						type: "bus",
					});
				else if (busType == "miniBusStop")
					//push the objects one by one
					miniBusStopLocation.push({
						position: new google.maps.LatLng(latitude, longitude),
						type: "minibus",
					});


			})

			// Create the icon of the markers.
			// some icon provided by google: http://kml4earth.appspot.com/icons.html
			var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';  //can use or not use

			const icon = {
				url: $("#targetMonth")[0].value == "2022-11" ? "http://maps.google.com/mapfiles/ms/icons/red-pushpin.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // url (local icon)
				scaledSize: new google.maps.Size(10, 10), // scaled size
				origin: new google.maps.Point(0, 0), // origin
				anchor: new google.maps.Point(0, 0) // anchor
			};

			const icon2 = {
				url: $("#targetMonth")[0].value == "2022-11" ? "http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png" : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // url (local icon)
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
			miniBusStopLocation.forEach(location => {
				marker = new google.maps.Marker({
					position: location.position,
					//icon: iconBase + 'parking_lot_maps.png',
					icon: icon2,
					map: map,
				});
				markers.push(marker);//store the marker for next time renew (see setMap(null)); otherwise it will exist forever

			}) //end of for loop		



		});

	});
}

function getFormattedMonth(offset) {
	const startMonth = 3;
	const startYear = 2021;
	month = (startMonth - 1 + parseInt(offset)) % 12 + 1;
	if (month < 10) { month = '0' + month; }
	year = Math.floor(startYear + ((2 + parseInt(offset)) / 12));
	return year + '-' + month;
}

$('#timeline').on('input', (e) => $("#timeline_value").html(getFormattedMonth(e.target.value)))
$('#timeline').change((e) => renderBusStop(getFormattedMonth(e.target.value)))
$('input').change(e => renderBusStop(getFormattedMonth($('#timeline').value)))

renderBusStop('2021-03')
