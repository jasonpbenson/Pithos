// let backdrop = document.querySelector('.backdrop');
// let modal1 = document.querySelector('.modal-1');
// let orb1 = document.querySelector('.orb-1');
let toggle = 'hidden';
let map = document.querySelector('#map');

$('.backdrop').on('click', function () {
    backdrop.style.display = 'none';
    modal1.style.display = 'none';
    map.style.display = 'none';
    toggle = 'hidden';
})


$('.submit-button').click((event) => {
    event.preventDefault()
    backdrop.style.display = 'block';
    if (toggle == 'hidden'){
        map.style.display = 'block';
        toggle = 'displayed'
    }else{
        console.log("or here?")
        map.style.display = 'none';
        toggle = 'hidden'
    }

    const mapEdge = $('.circle').offset()
    $('#map').offset({ top: mapEdge.top+50, left: mapEdge.left+50 });

})

$(window).resize(function () {
    const mapEdge = $('.circle').offset()
    $('#map').offset({ top: mapEdge.top+50, left: mapEdge.left+50 });
});


farmInfo.forEach(element => {
    let mapURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${element.farmName}&key=${apiKey}`
    // console.log(element)
    $.getJSON(mapURL, (info)=>{
        let address = info.results[0].formatted_address
        let latLong = info.results[0].geometry.location
        element.address = address
        element.latLong = latLong
        
    })

})
function initMap() {
    var gaMiddle = {lat: 32.838131, lng: -83.634705}
    // const gaMiddle = google.maps.LatLng(32.838131, -83.634705)
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 7, center: gaMiddle})
    map.setMapTypeId(`terrain`)
    let infowindow;
    farmInfo.forEach(element => {
        let marker = new google.maps.Marker({
            position: element.latLong,
            map:map,
            icon: `./images/map_icon.png`,
            animation: google.maps.Animation.BOUNCE
        });
        setTimeout(()=>{
            marker = new google.maps.Marker({
                position: element.latLong,
                map: map,
                icon: `./images/map_icon.png`,
            });
        },3000)
        infowindow = new google.maps.InfoWindow({
            content: element.blurb
        });    
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
        
        marker.setMap(map)
    })
}
