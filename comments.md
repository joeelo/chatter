const path = require("path");
const express = require("express");
const publicDirectoryPath = path.join(__dirname, "../public");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");

let express = require('express');
let app = express();
let http = require("http");
let server = http.createServer(app)
var server = require('http').createServer(app);
let socketio = require('socket.io');
let io = socketio(server);

app.get('/', function(req, res){
  res.sendFile(publicDirectoryPath);
});

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});

const port = process.env.PORT || 3000
app.use(express.static(publicDirectoryPath));
const io = socketio(server);

io.on("connection", (socket) => {
    console.log("new web socket connection");
})


app.listen(port, () => {
    console.log(`listening on Port ${port}`);
})

Instead of socket.emit sending the info to a particular connection
what you want to do is io.emit, and that will send to all users connected.


-------------------- THE chat.js file --------------------
let socket = io();

When the socket is initiated, it will create a connection with the emitting force in Node
when the button is clicked it will return a value called incrememnt to socket
increment will be a function that changes the value of count

socket.on("countUpdated", (count) => {
    console.log(`The count is now ${count}`)
})
document.addEventListener("DOMContentLoaded", () => {
    const plusButton = document.getElementById("increment-button");
    
    plusButton.addEventListener("click", () => {
        console.log("clicked");
        socket.emit("increment");
    });
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("countUpdated", count);

    socket.on("increment", () => {
        count++;
        io.emit("countUpdated", count);
    })
});

