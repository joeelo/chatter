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
const { generateMessage, generateLocationMessage } = require("./utils/message");
const moment = require("moment");

io.on("connection", (socket) => {
    
    socket.on("join", ({username, room}) => {
        socket.emit("message", generateMessage("You're gonna do great things"));
        socket.broadcast.to(room).emit("message", generateMessage(`${username} has joined!`));    
        socket.join(room)
    })

    socket.on("sendMessage", (inputValue, callback) => {
        const filter = new Filter();

        if (filter.isProfane(inputValue)) {
            return callback("Profanity is not allowed");
        }

        io.to("my room").emit("message", generateMessage(inputValue));
        callback();
    })

    socket.on("sendLocation", (positionObj, callback) => {
        let mapLocation = `https://google.com/maps?q=${positionObj.latitude},${positionObj.longitude}`
        console.log(generateLocationMessage(mapLocation));
        io.to("my room").emit("locationMessage", generateLocationMessage(mapLocation));

        callback();
    })

    socket.on("disconnect", () => {
        io.to("my room").emit("message", generateMessage("A user has left!"))
    })
   
})

server.listen(3000, function(){
    console.log('listening on *:3000');
});

