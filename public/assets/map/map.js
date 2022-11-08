// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: 22.318567, lng: 114.179606 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("googleMap"), {
      zoom: 11,
      center: uluru,
      //import a map with no unecessary element such as park
      mapId:'9f05925d813d14c6',
  
      //disable street view and zoom
      gestureHandling: "none",
      zoomControl: false,
      disableDefaultUI: true
  
    });
  
  //default geocoder, which decode the name to lat lng
  const geocoder = new google.maps.Geocoder();
  var defaultLocation = "Hong Kong";
  
  geocoder.geocode( { 'address': defaultLocation}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      /*
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });*/
    } else {
      console.log(status);
    }
  });
  
  //when user select a district, decode the name to location
  // set the center of the view to the target district
  var newSlect=document.getElementById("place-names");
  google.maps.event.addDomListener(newSlect,"change",()=>{
    var selectedText = newSlect.options[newSlect.selectedIndex].value;
    geocoder.geocode( { 'address': selectedText}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        /*
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });*/
      } else {
        console.log(status);
      }
    });
   //enlarge to appropriate level
    map.setZoom(15);
  
  });
  
  proj4.defs('EPSG:2326', '+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs');
  
  //After a time is selected, import corresponding csv by d3 and display the bus stop on map
  var timeChange=document.getElementById("targetMonth");
  var busStopLocation = [];
  var markers=[]; // to manipulate the markers after created
  google.maps.event.addDomListener(timeChange,"change",(e)=>{
   
    //delete all the markers before (otherwise the previous makers still exist)
    //have some delay, may need to improve it later
    for (var i = 0; i < markers.length; i++ ) {
      markers[i].setMap(null);
    }
    markers.length = 0;
  
    d3.csv("assets/data/busStop/"+document.getElementById("targetMonth").value+".csv", function(data) {
      //Now you can use 'data' variable as an array of objects
  
  
      //create an array containing objects of target location (csv)
    
      var len = data.length;
      for (var i = 0; i < len; i++) {
          //HK1980 Grid coordinate is not supported by google, so here we convert it to WGS84 degree
          [easting, northing] = [parseInt(data[i].X), parseInt(data[i].Y)];
          [longitude, latitude] = proj4('EPSG:2326', 'EPSG:4326', [easting, northing]);
  
          //push the objects one by one
          busStopLocation.push({
             position:new google.maps.LatLng(latitude, longitude),
             type: "bus",
          });
      }
  
       // Create the icon of the markers.
       var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  
       const icon = {
        url: "assets/map/icons/default-marker.png", // url
        scaledSize: new google.maps.Size(5, 5), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
       }; 
  
       //add marker
       for (let i = 0; i < busStopLocation.length; i++) {
        const marker = new google.maps.Marker({
        position: busStopLocation[i].position,
        //icon: iconBase + 'parking_lot_maps.png',
        icon:icon,
        map: map,
      });
      markers.push(marker);
  
      } //end of for loop
   
    });
   
  });
  
  
  
  
  } // end of the init function
  
  
  
    
  //init the map
  window.initMap = initMap;
  
  
  
  
  
  