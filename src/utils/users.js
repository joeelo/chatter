const users = [];
const fauxUser = {id: 1, username: "Joe lorenzo", room: 3000};
const fauxUser2 = {id: 2, username: "Joe", room: 3000};


// addUser, removeUser, getUser, getUsersInRoom

const addUser = (userObj) => {
    let { id, username, room } = userObj;
    username = username.trim().toLowerCase();
    console.log(username)
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

const removeUser = (userObj) => {
    const index = users.findIndex(user => user.id === userObj.id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }

}

addUser(fauxUser);
addUser(fauxUser2);
console.log(users);
const removedUser = removeUser(fauxUser);
console.log(removedUser);
console.log(users);


