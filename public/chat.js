let socket = io();

document.addEventListener("DOMContentLoaded", () => {
    const messageDiv = document.getElementById("chat-messages");
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
        // locBtn.setAttribute("disabled", "disabled")
        const success = (position) => {
            const positionObj = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            console.log("clicked")
            
            socket.emit("sendLocation", positionObj, (error) => {
                if(error) {
                    return alert({error});
                }
                // locBtn.removeAttribute("disabled");
                console.log("Location sent")
            });
        }
        const errorHandler = () => {
            return alert("semething went wrong!");
        }
        const options = {enableHighAccuracy: true, maximumAge: Infinity, timeout: 5000};

        navigator.geolocation.getCurrentPosition(success, errorHandler, options);
    })
    
    socket.on("message", (message) => {
        messageDiv.innerHTML += `<div class="message">${message.createdAt} - ${message.text} </div>`
    })

    socket.on("locationMessage", (mapLocationObj) => {
        messageDiv.innerHTML += `<span>${mapLocationObj.createdAt}</span> <a href=${mapLocationObj.url} target="_blank"> My current location </a>`
    })
})

