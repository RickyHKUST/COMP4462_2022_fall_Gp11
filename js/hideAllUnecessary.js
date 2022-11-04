// Initialize and add the map
function initMap() {
  var newSlect=document.getElementById("place-names");
  // The location of Uluru
  const uluru = { lat: 22.318567, lng: 114.179606 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
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
    var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
    });
  } else {
    console.log(status);
  }
});

//when user select a district, decode the name to location
// set the center of the view to the target district
google.maps.event.addDomListener(newSlect,"change",()=>{
  var selectedText = newSlect.options[newSlect.selectedIndex].value;
  geocoder.geocode( { 'address': selectedText}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
    } else {
      console.log(status);
    }
  });
 //enlarge to appropriate level
  map.setZoom(15);

});

} // end of the init function

//init the map
window.initMap = initMap;




