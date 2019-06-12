let socket = io();

document.addEventListener("DOMContentLoaded", () => {
    const ul = document.getElementById("chat-list");
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = event.target.elements.message
        console.log(message.value);
        socket.emit("sendMessage", message.value);
        message.value = ""
    })
    
    socket.on("message", (message) => {
        ul.innerHTML += `<li> ${message} </li>`
    })
})

