
//when user select a district (see place-names element), decode the name to location
  // set the center of the view to the target district
  var newSlect=document.getElementById("place-names");
  newSlect.addEventListener("change",()=>{
    var selectedText = newSlect.options[newSlect.selectedIndex].value; //obtain the selected name
    //turn the selected name to location
    geocoder.geocode( { 'address': selectedText}, function(results, status) {
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
    
  
  });

 
