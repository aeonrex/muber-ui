(function () {
    'use strict';

    var $subTitle = $('#subTitle');
    var $timeTable = $('#timetable');

    var writeStops = function (stops, length) {
        for (var i = 0; i < length; i++) {
            console.log(stops[i].name);
            $('#timetable').append('<div class="stop">' + stops[i].name + '</div>');
        }
    };

    var getGeoCoordinates = function (callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                callback(position.coords.longitude, position.coords.latitude);
            });
        } else {
            $subTitle.css('color', '#590000');
            $subTitle.text('You won\'t have a good time if your browser doesn\'t support location.');
        }
    };

    var getStops = function (longitude, latitude) {
        var flickerAPI = "https://api-muber.herokuapp.com/v1/stops";
        $.getJSON(flickerAPI, {
            longitude: longitude,
            latitude: latitude,
            distance: 1
        }).done(function (data) {
            console.log(JSON.stringify(data, null, '\t'));
            writeStops(data.results, data.count);
        });
    };

    var getDepartures = function (href) {
        //$.getJSON
    };

    $(document).ready(function () {
        getGeoCoordinates(function (longitude, latitude) {
         //   alert('Your long: ' + longitude + '\nYour lat: ' + latitude);
            getStops(longitude, latitude);
        });
    });
})();
