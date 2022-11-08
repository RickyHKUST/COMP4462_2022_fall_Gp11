//this is a tool for converting HK1980 Grid coordinate to WGS84 degree supported by google map
proj4.defs('EPSG:2326', '+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs');
  
//After a time is selected, import corresponding csv by d3 and display the bus stop on map
var timeChange=document.getElementById("targetMonth"); //see the html5 calendar
var busStopLocation = []; //an array to store the bus stop location (latitude, longitude)
var markers=[]; // to manipulate the markers after created
timeChange.addEventListener("change",(e)=>{
 
  //delete all the markers before (otherwise the previous makers still exist)
  //have some delay, may need to improve it later (maybe only show the markers within a region)
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;

  //use d3 to read the csv according to the name of selected date
  d3.csv("assets/data/busStop/"+document.getElementById("targetMonth").value+".csv", function(data) {
    //Now you can use 'data' variable as an array of objects
  
    /*There are many row, each contains a XY coordinate.
     However, this XY is using HK1980 Grid coordinate(not supported by google), 
     so here we convert it to WGS84 degree
     After that we use an array to store the result
    */
    var len = data.length;
    for (var i = 0; i < len; i++) {
        [easting, northing] = [parseInt(data[i].X), parseInt(data[i].Y)]; //be careful to the matching
        [longitude, latitude] = proj4('EPSG:2326', 'EPSG:4326', [easting, northing]);

        //push the objects one by one
        busStopLocation.push({
           position:new google.maps.LatLng(latitude, longitude),
           type: "bus",
        });
    }

     // Create the icon of the markers.
     // some icon provided by google: http://kml4earth.appspot.com/icons.html
     var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';  //can use or not use
    
     const icon = {
      url: "assets/map/icons/default-marker.png", // url (local icon)
      scaledSize: new google.maps.Size(5, 5), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
     }; 

     //add marker to the array of busStopLocation
     for (let i = 0; i < busStopLocation.length; i++) {
      const marker = new google.maps.Marker({
      position: busStopLocation[i].position,
      //icon: iconBase + 'parking_lot_maps.png',
      icon:icon,
      map: map,
    });
    markers.push(marker); //store the marker for next time renew (see setMap(null)); otherwise it will exist forever

    } //end of for loop
 
  });
 
});