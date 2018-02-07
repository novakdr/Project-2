if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (p) {
        console.log("Detected Latitiude is " + p.coords.latitude);
        console.log("Detected Longitude is " + p.coords.longitude);

        var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        var mapOptions = {
            center: LatLng,
            zoom: 40,
            //mapTypeId: google.maps.MapTypeId.ROADMAP
            mapTypeId: 'hybrid'
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        // var marker = new google.maps.Marker({
        //     position: LatLng,
        //     map: map,
        //     title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
        // });
    

        // google.maps.event.addListener(marker, "click", function (e) {
        //     var infoWindow = new google.maps.InfoWindow();
        //     infoWindow.setContent(marker.title);
        //     infoWindow.open(map, marker);
        // });





        //  Populate Map Markers
        $.get("/api/getLatLangsFromDB", function(data) {
            console.log(data);
            
            //Use data from API call to build markers
            // for(var i=0; i < data.length; i++){
            //     var LatLngLoopMarker = new google.maps.LatLng(data[i].lat, data[i].lng);
            //     var loopMarker = new google.maps.Marker({
            //         position: LatLngLoopMarker,
            //         map: map,
            //         title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + data[i].lat + "<br />Longitude: " + data[i].lng
            //     });

            //     google.maps.event.addListener(loopMarker, "click", function (e) {
            //         var infoWindow = new google.maps.InfoWindow();
            //         infoWindow.setContent(loopMarker.title);
            //         infoWindow.open(map, loopMarker);
            //     });

            // }


            function makeLoopMarker(i) {
                var LatLngLoopMarker = new google.maps.LatLng(data[i].lat, data[i].lng);
                var loopMarker = new google.maps.Marker({
                  position: LatLngLoopMarker,
                  map: map,
                  title: "<div style = 'height:60px;width:200px;color:black;'><b>Your location:</b><br />Latitude: " + data[i].lat + "<br />Longitude: " + data[i].lng
                });
                
                google.maps.event.addListener(loopMarker, "click", function (e) {
                  var infoWindow = new google.maps.InfoWindow();
                  infoWindow.setContent(loopMarker.title);
                  infoWindow.open(map, loopMarker);
                });
              }  
              
              for(var i=0; i < data.length; i++){
                makeLoopMarker(i);
              
              }
        });
    });
} else {
    alert('Geo Location feature is not supported in this browser.');
}

// BUTTONS AND MODAL STUFF
$('#find__button').on('click', function() {
    $('#find__modal')[0].showModal();
});

$('#lost__button').on('click', () => {
    $('#lost__modal')[0].showModal();
});

$('#submit__lost').on('click', () => {
    event.preventDefault();
    var lostName = $("#lostName").val().trim();
    var lostItem = $("#lostItem").val().trim();
    var lostDescription = $("#lostDescription").val().trim();
    var lostLat = $("#lostLat").val().trim();
    var lostLong = $("#lostLong").val().trim();
    
    console.log(lostName + ' ' + lostItem + ' ' + lostDescription + ' ' + lostLat + ' ' + lostLong);
  

    // POST route for saving a new lost item to the database
    // isLost default value is "TRUE" for the submit_lost modal
    $.post({
        url: '/api/new',
        data: {user: lostName, item: lostItem, description: lostDescription, longitude:lostLong, lattitude:lostLat, reward:0, isLost:true}
    }).then(function(response){
        console.log(response);
    })

    // CLEARS LOST MODAL
    $("#lostName").val('');
    $("#lostItem").val('');
    $("#lostDescription").val('');
    $("#lostLat").val('');
    $("#lostLong").val('');
});

$('.close').on('click', () => {
    $('#lost__modal')[0].close();
    $('#find__modal')[0].close();
});