const path = require("path");
const publicDirectoryPath = path.join(__dirname, "../public");
const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app)
const socketio = require('socket.io');
const io = socketio(server);
const Filter = require("bad-words");
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
    const message = "You're gonna do great things";
    socket.emit("message", message);
    socket.broadcast.emit("message", "A new user has joined!");

    socket.on("sendMessage", (inputValue, callback) => {
        const filter = new Filter();

        if (filter.isProfane(inputValue)) {
            return callback("Profanity is not allowed");
        }

        io.emit("message", inputValue);
        callback();
    })

    socket.on("sendLocation", (positionObj, callback) => {
        mapLocation = `https://google.com/maps?q=${positionObj.latitude},${positionObj.longitude}`
        console.log(mapLocation);
        io.emit("message", (mapLocation));

        callback();
    })

    socket.on("disconnect", () => {
        io.emit("message", "A user has left!")
    })
   
})

server.listen(3000, function(){
    console.log('listening on *:3000');
});

