(function ($) {

    //Google MAP
    var GMap = {
        geocoder: function (idName) {
            alert('ok');
            var geocoder = new google.maps.Geocoder(),
                m_location,
                address = jQuery(idName).data('address');
            if (jQuery(idName).length) {
                geocoder.geocode({
                    'address': address
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        m_location = results[0].geometry.location;
                    } else {
                        m_location = new google.maps.LatLng(-33.86938, 151.204834);
                    }
                    GMap.map(m_location, address);
                });
            }
        },
        map: function (m_location, address) {
            var myOptions = {
                zoom: 14,
                center: m_location,
                scrollwheel: false,
                scaleControl: false,
                disableDefaultUI: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    "featureType": "landscape",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 60
                    }]
                }, {
                    "featureType": "road.local",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "lightness": 40
                    }, {
                        "visibility": "on"
                    }]
                }, {
                    "featureType": "transit",
                    "stylers": [{
                        "saturation": -100
                    }, {
                        "visibility": "simplified"
                    }]
                }, {
                    "featureType": "administrative.province",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "water",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "lightness": 30
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ef8c25"
                    }, {
                        "lightness": 40
                    }]
                }, {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }, {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#b6c54c"
                    }, {
                        "lightness": 40
                    }, {
                        "saturation": -40
                    }]
                }, {}]
            };
            var map = new google.maps.Map(document.getElementById("mapheader"), myOptions);

            var image = "img/szpilka_mapa-01.png";
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                position: map.getCenter()
            });

            var contentString = address;
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            if (touch) {
                map.setOptions({
                    draggable: false
                });
            } else {
                map.setOptions({
                    draggable: true
                });
            }

            google.maps.event.addListener(marker, "click", function () {
                infowindow.open(map, marker);
            });
            google.maps.event.addDomListener(window, "resize", function () {
                var center = map.getCenter();
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);

                if (touch) {
                    map.setOptions({
                        draggable: false
                    });
                } else {
                    map.setOptions({
                        draggable: true
                    });
                }
            });
        },
        load: function () {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//maps.googleapis.com/maps/api/js?v=3.exp&' +
                'callback=gmap';
            if (fileprotocol) {
                script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&' +
                    'callback=gmap';
            }
            document.body.appendChild(script);
        },
        init: function () {
            GMap.geocoder('#mapheader');
        }
    }

    window.gmap = function gmap() {
        GMap.init();
    }


})(jQuery);