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
  selectPlace();
  
} // end of the init function
  
function selectPlace(e){
  //turn the selected name to location
  var defaultLocation = "Hong Kong";
  var region = e?e.target.value:defaultLocation
  console.log(region);
  geocoder.geocode( { 'address': region}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location); //set center but don't add any marker
      /* 
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });*/
    } else {
      console.log(status);
    }
  });
 //enlarge to appropriate level: larger the number => zoom in closer
  map.setZoom(15);
}

$("#place-names").change(selectPlace)
  
var map;
var geocoder = new google.maps.Geocoder();
initMap();
  
  
  
  
  
  