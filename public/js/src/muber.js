(function () {
    'use strict';

    var $subTitle = $('#subTitle');
    var $loading = $('#loading');
    var $timeTable = $('#timetable');
    var $stops = $('#stops');

    var host = 'https://api-muber.herokuapp.com';
    // var host = 'http://localhost:8080';
    var stopCount = 0;
    var finishedCount = 0;

    var show = function () {
        $timeTable.removeClass('hidden');
        $loading.addClass('hidden');
    };
    var hide = function () {
        $timeTable.addClass('hidden');
        $loading.removeClass('hidden');
    };

    var noResults = function () {
        var content = '<p>Oh no!</p>' +
            '<p>Looks like we don\'t have any data of bus stops in your area.</p>' +
            '<p></p>' +
            '<p>Try adjusting the search radius.</p>' +
            '<p>If you still can\'t find anything try <a href="https://itunes.apple.com/us/app/uber/id368677368?mt=8">Uber</a>!</p>';

        $stops.append(content);
        show();
    };

    var getRadius = function () {
        return $('#slider').val();
    };

    var writeStop = function (stop) {
        var content = '<div class="stop" data-role="collapsible" id="' + stop.self.id + '">' +
            '<h2>'
            + stop.name + '<span class="distance">' + stop.distance.calculated.toFixed(2) + ' mi.</span>' +
            "</h2>" +
            '<ol data-role="listview">';


        for (var i = 0; i < stop.departures.length; i++) {
            var dep = stop.departures[i];
            if (!dep.timeTable) {
                continue;
            }
            content += '<li data-role="collapsible"><h3>' + dep.title + ' - ' + dep.routeTitle + '</h3>';
            content += '<ol data-role="listview">';
            for (var j = 0; j < dep.timeTable.length; j++) {
                var time = dep.timeTable[j];
                content += '<li><span>' + time.minutes + ' mins</span><span class="bus"> Bus #' + time.vehicle + '</span></li>';
            }
            content += '</ol>';
            content += '</li>'
        }
        content += '</ol>' + '</div>';
        $stops.append(content);
        $timeTable.collapsibleset('refresh');
        if (++finishedCount === stopCount) {
            show();
        }
    };

    var getGeoCoordinates = function (callback) {
        setTimeout(function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    callback(position.coords.longitude, position.coords.latitude);
                });
            } else {
                $subTitle.css('color', '#590000');
                $subTitle.text('You won\'t have a good time if your browser doesn\'t support location.');
            }
        }, 100);
    };

    /**
     * getStops
     *
     * queries stops based on longitude, latitude, and a search radius
     *
     * @param {float} longitude
     * @param {float} latitude
     * @param {float} distance
     */
    var getStops = function (longitude, latitude, distance) {
        var stops = host + '/v1/stops';
        $.getJSON(stops, {
            longitude: longitude,
            latitude: latitude,
            distance: distance
        }).done(function (data) {
            stopCount = data.count;

            if (stopCount === 0) {
                noResults();
            } else {
                for (var i = 0; i < data.count; i++) {
                    getDepartures(data.results[i]);
                }
            }
        });
    };

    /**
     * getDepartures
     * Takes a stop object and queries for up-coming Buses.
     *
     * @param {object} stop
     */
    var getDepartures = function (stop) {

        $.getJSON(host + stop.departures.href).done(function (data) {
            var dir = [];
            data.results.forEach(function (res) {
                dir = dir.concat(res.directions.map(function (direction) {
                    direction.routeTitle = res.routeTitle;
                    return direction;
                }));
            });
            console.log(JSON.stringify(data.results, null, '\t'));
            stop.departures = dir;
            writeStop(stop);
        });
    };

    /**
     * Triggers the search flow
     */
    var search = function () {
        stopCount = 0;
        finishedCount = 0;
        hide();
        $('#stops').empty();
        getGeoCoordinates(function (longitude, latitude) {
            var distance = getRadius();
            getStops(longitude, latitude, distance);
        });
    };

    $(document).ready(function () {
        search();
        $('#search').click(search);
    });
})();
