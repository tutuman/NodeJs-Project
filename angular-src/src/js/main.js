'use strict';
//viewModel data
var mapData = [{
    name: 'Mahrishi University Of Management',
    lat: 41.0178718,
    lng: -91.9694967,
    url: 'https://www.mum.edu/',
    address: '1000 N 4th St',
    city: 'Fairfield, IA'
}, {
    name: 'University Of Iowa',
    lat: 41.6626963,
    lng: -91.5570885,
    url: 'https://uiowa.edu/',
    address: '52242',
    city: 'Iowa City, IA'
}, {
    name: 'Drake Univeristy',
    lat: 41.6012863,
    lng: -93.6602525,
    url: 'http://www.drake.edu/',
    address: 'http://www.drake.edu/',
    city: 'Des Moines, IA'
}, {
    name: 'Iowa State University',
    lat: 42.0266187,
    lng: -93.6486541,
    url: 'https://www.iastate.edu/',
    address: '0880 Beardshear Hall',
    city: 'Ames, IA'
}, {
    name: 'Iowa Central College',
    lat: 42.4903509,
    lng: -94.2062085,
    url: 'http://www.iowacentral.edu/',
    address: '1916 Russell Street',
    city: 'Storm Lake, IA'
}];

function mapInit() {

    var viewModel = function() {
        var self = this,
            localLocation = {
                lat: 41.0178718,
                lng: -91.9694967
            },
            map;
        self.markersArr = ko.observableArray();
        self.wikiLinks = ko.observableArray(null);
        self.wikiLinks = ko.observableArray(['Please click on a marker to get wikipedia links']);

        (function initMap() {
            map = new google.maps.Map(document.getElementById('meromap'), {
                center: localLocation,
                disableDefaultUI: true,
                zoom: 7
            });
            var markerData = mapData,
                point,
                name,
                infowindowData;
            for (var i = 0; i < mapData.length; i++) {
                point = new google.maps.LatLng(markerData[i].lat, markerData[i].lng);
                name = markerData[i].name;
                infowindowData = markerData[i];

                addMarkers(point, name, infowindowData, i);
            }
        })();
        var infowindow = new google.maps.InfoWindow();

        //adding markers to map
        function addMarkers(loc, name, infowindowData) {
            var marker = new google.maps.Marker({
                position: loc,
                animation: google.maps.Animation.DROP,
                title: name,
                map: map
            });
            google.maps.event.addListener(marker, 'click', addinfoWindow(infowindowData, marker));
            //create obervable array of markers
            self.markersArr.push(marker);
        }

        //Add infowindow information to marker
        function addinfoWindow(infowindowData, marker) {
            return function() {
                //var wikiSearch = infowindowData.name;
                var img =
                    'https://maps.googleapis.com/maps/api/streetview?size=200x100&location=' +
                    infowindowData.address + ',' + infowindowData.city;
                //getting wikipedia link
                getWikiData(infowindowData);
                var content = '<img src="' + img +
                    '" alt="Street View Image of ' +
                    infowindowData.name + '"><br>' + '<strong>' +
                    infowindowData.name + '</strong>' + '<br>' +
                    infowindowData.address + '<br>' +
                    infowindowData.city + '<br>' + '<a href="' +
                    infowindowData.url + '">' + infowindowData.url +
                    '</a>';
                infowindow.close();
                // update the content of the infowindow before opening it
                infowindow.setContent(content);
                infowindow.open(map, marker);
                toggleBounce(map, marker);
            };
        }

        //Animating marker when clicked
        function toggleBounce(map, marker) {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 2000);
            }
        }

        //AJAX call from wikipedia for links
        function getWikiData(infowindowData) {
            self.wikiLinks.removeAll();
            var searchWiki = infowindowData.name;
            var wikiUrl =
                'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
                searchWiki + '&format=json&callback=wikiCallback';
            // load wikipedia data
            console.log(wikiUrl);
            $.ajax({
                url: wikiUrl,
                dataType: 'jsonp'
                    // jsonp: "callback"
            }).done(function(response) {
                var resList = response[1],
                    url,
                    articleString;
                for (var i = 0; i < resList.length; i++) {
                    articleString = resList[i];
                    url = 'http://en.wikipedia.org/wiki/' + articleString;
                    self.wikiLinks.push('<li><a href="' + url + '">' + articleString + '</a></li>');
                    //console.log(self.wikiLinks());
                }
            }).fail(function() {
                return self.wikiLinks.push(
                    'Failed to get from wikipedia'
                );
            });
        }

        // centers map as window size changes
        google.maps.event.addDomListener(window, 'resize', function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        });

        //filter list
        self.query = ko.observable('');

        //filter list by name
        self.filteredArray = ko.computed(function() {
            return ko.utils.arrayFilter(self.markersArr(),
                function(marker) {
                    return marker.title.toLowerCase().indexOf(self.query().toLowerCase()) !== -1;
                });
        }, self);

        //compare filter array to marker array to determine which markers should be visible
        self.filteredArray.subscribe(function() {
            var compareArrays = ko.utils.compareArrays(self.markersArr(),
                self.filteredArray());
            ko.utils.arrayForEach(compareArrays, function(
                marker) {
                if (marker.status === 'deleted') {
                    marker.value.setMap(null);
                } else {
                    marker.value.setMap(map);
                }
            });
        });

        //open infowindow if marker is clicked
        self.selectItem = function(item) {
            google.maps.event.trigger(item, 'click');
        };
    };

    ko.applyBindings(new viewModel());
}

//if google map is not loaded
function googleError() {
    $('#meromap').html(
        '<h3>Could not load map, Please try again later </h3>');
}

//sidebar open close function
function sidebar() {
    if (open == true) {
        $('.sidebar').animate({
            width: 'toggle'
        }, 350);


        $('.main').removeClass('col-md-9');
        $('.main').removeClass('col-sm-9');

        $('.main').addClass('col-md-12');
        $('.main').addClass('col-sm-12');

        open = false;
    } else {
        $('.sidebar').fadeIn(500);

        $('.main').addClass('col-md-9');
        $('.main').addClass('col-sm-9');

        $('.main').removeClass('col-md-12');
        $('.main').removeClass('col-sm-12');

        open = true;
    }
}

//adjusting automatic height for sidebar

$(document).ready(function() {
    var height = $(window).height();
    $('.sidebar').css('height', height);
})
