let express = require('express');
let socket = require('socket.io');

let Room = require('./Room');
let User = require('./User');

let app = express();

let roomsList = {};
let roomIdCounter = 1;

server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});

io = socket(server);

io.on('connection', (socket) => {

    console.log('socket', socket.id);

    socket.on('giveMeRoomsList', function() {
        let roomsListArray = [];
        let roomsKeys = Object.keys(roomsList);
        for(let i = 0; i < Object.keys(roomsList).length; i++) {
            roomsListArray.push(roomsList[roomsKeys[i]]);
        }
        console.log(roomsListArray);
        let rooms = Object.keys(socket.rooms);
        console.log('rooms', rooms);
        io.emit('roomsList', roomsListArray);

    });

    socket.on('giveMeRoom', function(roomId) {
        socket.join(roomId);
        // io.emit('roomMessages', roomsList[roomId].getMessages());
        io.sockets.in(roomId).emit('roomMessages', roomsList[roomId].getMessages());
        io.sockets.in(roomId).emit('userJoinedRoom');

        socket.on('userIsTyping', function(user) {
            if(user) {
                io.sockets.in(roomId).emit('userIsTyping', user);
            }
        });

        socket.on('userStopTyping', function(user) {
            if(user) {
                io.sockets.in(roomId).emit('userStopTyping', user);
            }
        })

        // io.sockets.in('some other room').emit('hi');
    });

    socket.on('createNewRoom', function() {
        let room = new Room(roomIdCounter);
        roomsList[roomIdCounter] = room;
        socket.join(roomIdCounter);
        io.emit('newRoomCreated', roomIdCounter);
        roomIdCounter++;
    });

    socket.on('leaveRoom', function(roomId) {
        socket.leave(roomId);
    });

    socket.on('addMessageToRoom', function(data) {
        roomsList[data.roomId].setMessage(data.message);
        io.sockets.in(data.roomId).emit('messageAdded', data.message);
    });
});



/////////////////////////////////////////////////////////////////////////////////////////

// var app = require('express').createServer();
// var io = require('socket.io').listen(app);
//
// app.listen(8080);
//
// // routing
// app.get('/', function (req, res) {
//     res.sendfile(__dirname + '/index.html');
// });
//
// // usernames which are currently connected to the chat
// var usernames = {};
//
// // rooms which are currently available in chat
// var rooms = ['room1','room2','room3'];
//
// io.sockets.on('connection', function (socket) {
//
//     // when the client emits 'adduser', this listens and executes
//     socket.on('adduser', function(username){
//         // store the username in the socket session for this client
//         socket.username = username;
//         // store the room name in the socket session for this client
//         socket.room = 'room1';
//         // add the client's username to the global list
//         usernames[username] = username;
//         // send client to room 1
//         socket.join('room1');
//         // echo to client they've connected
//         socket.emit('updatechat', 'SERVER', 'you have connected to room1');
//         // echo to room 1 that a person has connected to their room
//         socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
//         socket.emit('updaterooms', rooms, 'room1');
//     });
//
//     // when the client emits 'sendchat', this listens and executes
//     socket.on('sendchat', function (data) {
//         // we tell the client to execute 'updatechat' with 2 parameters
//         io.sockets.in(socket.room).emit('updatechat', socket.username, data);
//     });
//
//     socket.on('switchRoom', function(newroom){
//         // leave the current room (stored in session)
//         socket.leave(socket.room);
//         // join new room, received as function parameter
//         socket.join(newroom);
//         socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
//         // sent message to OLD room
//         socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
//         // update socket session room title
//         socket.room = newroom;
//         socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
//         socket.emit('updaterooms', rooms, newroom);
//     });
//
//     // when the user disconnects.. perform this
//     socket.on('disconnect', function(){
//         // remove the username from global usernames list
//         delete usernames[socket.username];
//         // update list of users in chat, client-side
//         io.sockets.emit('updateusers', usernames);
//         // echo globally that this client has left
//         socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
//         socket.leave(socket.room);
//     });
// });