let showInfoWindow = (marker, name) => {
    let infowindow = new google.maps.InfoWindow ({
        content: name
    })
    google.maps.event.addListener(marker, "click", function () {
        setTimeout(() => {infowindow.close()}, 5000);
        infowindow.open(marker.map, marker)
    })
}