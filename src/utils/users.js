const users = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = (userObj) => {
    let { id, username, room } = userObj;
    if (!username || !room) {
        return {error: "username and room are required"};
    }

    const existingUser = users.find( user => user.username === username && user.room === room);
    if (existingUser) {
        return {error: "There is already a user with that name in the chat"};
    }

    const user = { id, username, room}
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }

}

const getUser = (id) => {
    return users.find(user => user.id === id);
}

const getUsersInRoom = (room) => {
    const roomUsers = users.filter(user => room === user.room);
    return roomUsers;
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}



