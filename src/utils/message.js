const moment = require("moment");

const generateMessage = (username, text) => {
    const date = new Date();
    const now = moment(date).calendar();
    return {
        username: username,
        text: text,
        createdAt: now
    }
}

const generateLocationMessage = (username, url) => {
    const date = new Date();
    const now = moment(date).calendar();
    return {
        username: username,
        url: url, 
        createdAt: now
    }
}

module.exports = {
    generateMessage: generateMessage,
    generateLocationMessage: generateLocationMessage
}