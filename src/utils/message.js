const moment = require("moment");

const generateMessage = (text) => {
    const date = new Date();
    const now = moment(date).calendar();
    return {
        text: text,
        createdAt: now
    }
}

module.exports = {
    generateMessage: generateMessage
}