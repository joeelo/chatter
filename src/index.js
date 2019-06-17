const path = require("path");
const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app)
const socketio = require('socket.io');
const io = socketio(server);
const Filter = require("bad-words");
const { generateMessage, generateLocationMessage } = require("./utils/message");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users");
const moment = require("moment");
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
    
    socket.on("join", ({username, room}, callback) => {
        room = room.trim().toLowerCase();
        const {error, user} = addUser({id: socket.id, username: username, room: room});

        if (error) {
            return callback(error);
        }

        socket.join(room)

        socket.broadcast.to(user.room).emit("message", generateMessage(`${user.username} has joined!`));    
        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback();
    })

    socket.on("sendMessage", (inputValue, callback) => {
        const user = getUser(socket.id);        
        const filter = new Filter();

        if (filter.isProfane(inputValue)) {
            return callback("Profanity is not allowed");
        }
        io.to(user.room).emit("message", generateMessage(user.username, inputValue));
        console.log(generateMessage(user.username, inputValue));
        callback();
    })

    socket.on("sendLocation", (positionObj, callback) => {
        const user = getUser(socket.id)
        let mapLocation = `https://google.com/maps?q=${positionObj.latitude},${positionObj.longitude}`
        console.log(generateLocationMessage(user.username, mapLocation));
        io.to(user.room).emit("locationMessage", generateLocationMessage(user.username, mapLocation));

        callback();
    })

    socket.on("disconnect", () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit("message", generateMessage(`${user.username} has left`))
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }


    })
   
})

server.listen(3000, function(){
    console.log('listening on *:3000');
});

