$('.nav-item a').on('click',function(){
    $(this).parent().parent().find('a.active').removeClass('active');
    $(this).addClass('active');

})

function regular_map(){
    var var_location = new google.maps.LatLng(16.464620,107.574690);

    var var_mapoptions = {
        center: var_location,
        zoom:14
    };

    var var_map = new google.maps.Map(document.getElementById("map-container"),var_mapoptions);

    var var_marker = new google.maps.Marker({
        position: var_location,
        map: var_map,
        title:"Thành Phố Huế"
    });
}
/*Initialize map*/
google.maps.event.addDomListener(window,'load',regular_map);
