module.exports.config = {
    name: "nsfw",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Spirit",
    description: "restriction",
    usePrefix: true,
    commandCategory: "admin",
    usages: "",
    cooldowns: 0,
};

module.exports.languages = {
    "en": {
        "returnSuccessEnable": "Success enable NSFW command for this group",
        "returnSuccessDisable": "Success disable NSFW command for this group",
        "error": "Error! An error occurred. Please try again later!"
    }
};

module.exports.run = async function ({ event, api, Threads, getText }) {
    const { threadID, messageID } = event;
    const { getData, setData } = Threads;
    var type;

    try {
        let data = (await getData(threadID)) || {};
        if (typeof data.NSFW == "undefined" || data.NSFW == false) {
            data.NSFW = true;
            global.data.threadAllowNSFW.push(threadID);
            type = "on";
        } else {
            data.NSFW = false;
            global.data.threadAllowNSFW = global.data.threadAllowNSFW.filter(item => item != threadID);
        }
        await setData(threadID, data);
        return api.sendMessage((type == "on") ? getText("returnSuccessEnable") : getText("returnSuccessDisable"), threadID, messageID);
    } catch (e) {
        console.log(e);
        return api.sendMessage(getText("error"), threadID, messageID);
    }
};