var app = angular.module('Thermostat', ['ngRoute']);

//app.value('io',io);

app.factory('socket', function ($rootScope) {
    var socket = window.io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

function routes($routeProvider) {
    $routeProvider.
        when('/', {
            controller: ListController,
            templateUrl: 'partials/list.html'
        })
        .
        when('/downstairs/:id', {
            controller: DetailController,
            templateUrl: '/partials/detail.html'
        }).
        when('/upstairs/:id', {
            controller: DetailController,
            templateUrl: '/partials/detail.html'
        }).
        otherwise({
            redirectTo: '/'
        });        
}
app.config(routes);


function ListController($rootScope, $location, socket) {
    socket.on('init', function (data) {
        $rootScope.rooms = data;
        $rootScope.title = 'All Thermostats';
        $rootScope.navigate = function (room, sub) {
            var str = $location.path() + sub + '/' + room;
            $location.path(str);
        };
    });
    socket.on('update', function (data) {
        $rootScope.rooms[data.stairs][data.index]['degrees'] = data.newdegrees;
    });
}


function DetailController($rootScope, $routeParams, $location, socket) {
    var path = $location.path();
    var stairs;
    if (path.indexOf('downstairs') != -1) {
        stairs = 'downstairs';
    } else {
        stairs = 'upstairs';
    }
    var id = $routeParams.id;
    console.log(id);
    id = id.substring(id.length - 1, id.length);
    id = parseInt(id, 10) - 1;
    $rootScope.room = $rootScope.rooms[stairs][id];
    $rootScope.title = 'Thermostat Control';
    $rootScope.home = function () {
        $location.path('/');
    };
    socket.on('update', function (data) {
        $rootScope.rooms[data.stairs][data.index]['degrees'] = data.newdegrees;
    });
}
