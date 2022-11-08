// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: 22.318567, lng: 114.179606 };
    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById("googleMap"), {
      zoom: 11, //larger the number => zoom in closer
      center: uluru,
      /*import a map with no unecessary element such as park
      we need to modify this on google map platform
      this would not affect adding markers, zoom in zoom out*/
      mapId:'9f05925d813d14c6',
  
      //disable street view and zoom (avoid user to change it)
      gestureHandling: "none",
      zoomControl: false,
      disableDefaultUI: true
  
    });
  
  /*The geocoder decode the name to lat lng. 
  By default the location is Hong Kong*/
  geocoder = new google.maps.Geocoder(); //The geocoder decode the name to lat lng. 
  var defaultLocation = "Hong Kong";
  geocoder.geocode( { 'address': defaultLocation}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);

      //add marker to the result of the geocoder
      /*
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });*/
    } else {
      console.log(status);
    }
  });
  
  } // end of the init function
  
  
  
  var map;
  var geocoder;
  //init the map
  window.initMap = initMap;
  
  
  
  
  
  