const axios = require("axios");

let simSimiEnabled = false;

module.exports.config = {
    name: "autotalk",
    version: "1.2.1",
    hasPermssion: 0,
    credits: "Yukihira Soma",
    description: "Toggle SimSimi auto-reply",
    usePrefix: true,
    commandCategory: "sim",
    usages: ["on", "off"],
    cooldowns: 2,
};

module.exports.handleEvent = async function({ api, event }) {
    if (simSimiEnabled && event.type === "message" && event.senderID !== api.getCurrentUserID()) {
        const content = encodeURIComponent(event.body);

        try {
            const res = await axios.get(`https://simsimi.site/api/v2/?mode=talk&lang=ph&message=${content}&filter=true`);
            const respond = res.data.success;

            if (res.data.error) {
                api.sendMessage(`Error: ${res.data.error}`, event.threadID);
            } else {
                api.sendMessage(respond, event.threadID);
            }
        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while fetching the data.", event.threadID);
        }
    }
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID } = event;
    const action = args[0]?.toLowerCase();

    if (action === "on") {
        simSimiEnabled = true;
        return api.sendMessage("SimSimi auto-reply is now ON.", threadID, messageID);
    } else if (action === "off") {
        simSimiEnabled = false;
        return api.sendMessage("SimSimi auto-reply is now OFF.", threadID, messageID);
    } else {
        if (!simSimiEnabled) {
            return api.sendMessage("SimSimi auto-reply is currently OFF. Use 'autotalk on' to enable.", threadID, messageID);
        }

        api.sendMessage("Invalid command. You can only use 'autotalk on' or 'autotalk off'.", threadID, messageID);
    }
};
