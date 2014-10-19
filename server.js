var express = require('express');
var http = require('http');
var Backbone = require('backbone');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/public'));
server.listen(9000);

console.log('server listening on port:: 9000');

var rooms = {
    "downstairs": [
        {
            'name': 'Room1',
            'degrees': '73',
            'coolsetpoint': '76',
            'heatsetpoint': '68'
        },
        {
            'name': 'Room2',
            'degrees': '73',
            'coolsetpoint': '76',
            'heatsetpoint': '68'
        },
        {
            'name': 'Room3',
            'degrees': '73',
            'coolsetpoint': '76',
            'heatsetpoint': '68'
        },
        {
            'name': 'Room4',
            'degrees': '73',
            'coolsetpoint': '76',
            'heatsetpoint': '68'
        }
    ],
    "upstairs": [
        {
            'name': 'Room1',
            'degrees': '73',
            'coolsetpoint': '76',
            'heatsetpoint': '68'
        },
        {
            'name': 'Room2',
            'degrees': '73',
            'coolsetpoint': '76',
            'heatsetpoint': '68'
        },
        {
            'name': 'Room3',
            'degrees': '73',
            'coolsetpoint': '76',
            'heatsetpoint': '68'
        },
        {
            'name': 'Room4',
            'degrees': '73',
            'coolsetpoint': '76',
            'heatsetpoint': '68'
        }
    ]
};
var collection = Backbone.Collection.extend({});
var downstairscollection = new collection(rooms.downstairs);
var upstairscollection = new collection(rooms.upstairs);
io.sockets.on('connection', function (socket) {
    io.sockets.emit('init', rooms);
    downstairscollection.on('change', function (data) {
        var roomname = data.attributes.name;
        var index = roomname.substring(roomname.length - 1, roomname.length);
        index = parseInt(index, 10) - 1;
        var data = {
            stairs: 'downstairs',
            index: index,
            newdegrees: data.attributes.degrees
        };
        io.sockets.emit('update', data);
    });
    function update() {
        downstairscollection.at(0).set('degrees', '53');
    }
    setTimeout(update, 10000);
});
