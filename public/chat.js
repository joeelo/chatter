let socket = io();

document.addEventListener("DOMContentLoaded", () => {
    const ul = document.getElementById("chat-list");
    const form = document.getElementById("form");
    const locBtn = document.getElementById("send-location");
    const formBtn = document.getElementById("form-button");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = event.target.elements.message
        console.log(message.value);
        formBtn.setAttribute("disabled", "disabled");

        socket.emit("sendMessage", message.value, (error) => {
            if (error) {
                return alert(error);
            }
            formBtn.removeAttribute("disabled");
            console.log("Message Delivered")
            message.focus();

        });
        message.value = ""
    })

    locBtn.addEventListener("click", (event) => {
        if( !navigator.geolocation ) {
            return alert("Geolocation not supported by your browser.")
        }
        locBtn.setAttribute("disabled", "disabled")
        
        navigator.geolocation.getCurrentPosition((position) => {
            positionObj = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            console.log(positionObj);

            socket.emit("sendLocation", positionObj, (error) => {
                if(error) {
                    return alert("Something went wrong");
                }
                locBtn.removeAttribute("disabled");
                console.log("Location sent")
            });
        })
    })
    
    socket.on("message", (message) => {
        ul.innerHTML += `<li> ${message} </li>`
    })
})

