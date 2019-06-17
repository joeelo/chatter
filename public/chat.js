let socket = io();

document.addEventListener("DOMContentLoaded", () => {
    const messageDiv = document.getElementById("message-box");
    const form = document.getElementById("form");
    const locBtn = document.getElementById("send-location");
    const formBtn = document.getElementById("form-button");
    const sideBar = document.getElementById("chat-sidebar");

    const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true});

    // console.log({username, room})

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
        const div = document.createElement("div");
        div.classList.add("message");
        div.innerHTML += `<p>${message.username} ${message.createdAt}</p><p>${message.text}</p>`;
        messageDiv.append(div);
        // messageDiv.innerHTML += `<div class="message">${message.createdAt} - ${message.text} </div>`
    })

    socket.on("locationMessage", (mapLocationObj) => {
        console.log(mapLocationObj);
        messageDiv.innerHTML += `<p>${mapLocationObj.username} ${mapLocationObj.createdAt}</p> <a href=${mapLocationObj.url} target="_blank"> My current location </a>`
    })

    socket.emit("join", { username, room }, (error) => {
        if (error) {
            alert(error);
            location.href = "/";
        }
    })

    socket.on("roomData", ({room, users}) => {
        console.log(users);
        const renderUsers = users.map(user => `<p> ${user.username} </p>` )
        sideBar.innerHTML = 
        `
            <h1>${room}</h1>
            <h2> Users </h2><br>
            ${renderUsers.join("")}
        `
    })

})

