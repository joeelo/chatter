const path = require("path");
const publicDirectoryPath = path.join(__dirname, "../public");

let express = require('express');
let app = express();
let http = require("http");
let server = http.createServer(app)
let socketio = require('socket.io');
let io = socketio(server);
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
    const message = "You're gonna do great things";
    socket.emit("message", message);

    socket.on("sendMessage", (inputValue) => {
        io.emit("message", inputValue);
    })
   
})

server.listen(3000, function(){
    console.log('listening on *:3000');
});

