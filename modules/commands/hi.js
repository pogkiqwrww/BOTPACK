module.exports.config = {
  name: "hi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sam",
  description: "hi gửi sticker",
  usePrefix: true,
  commandCategory: "QTV BOX",
  usages: "[text]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    "hello",
    "hi",
    "nani",
    "hello po",
    "hi po",
    "hiii",
    "helloo",
    "loe",
    "low",
    "lo",
    "hey",
    "heyy",
    "loe po",
    "low po",
    "hai",
    "Hi",
    "Hello",
    "yow",
    "híí",
    "hì",
    "hìì",
    "lô",
    "helo",
    "hê nhô",
    "goodevening",
    "good evening",
    "goodeve",
    "gn",
    "eve",
    "evening",
    "good afternoon",
    "good aftie",
    "aftie",
    "afternoon"
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["hi"] == "undefined", thread["hi"] == false) return
  else {
  if (KEY.includes(event.body) !== false) {
    let data = [
      "1747091025602149", "2041020049458802",
      "2041012539459553", "2041017422792398",
      "2041015016125972", "2041022029458604",
      "2041021119458695", "2041015329459274",
      "2041015182792622", "237320150420978",
      "237320717087588", "237321127087547",
      "237320493754277", "237318950421098",
      "237319333754393", "237319140421079",
    
    ];
    let sticker= data[Math.floor(Math.random() * data.length)];
let juswa = ["have you eaten?", "what are you doing?", "try my commands!", "I'm a chat bot nice to meet you", "I'm updating my commands, what are you doing?", "Can you interact with me using sim command?","You're so beautiful/handsome binibini/ginoo", "can you intereact w/ me?","are you bored? talk to my admin", "hows day going?", "eat some sweets", "are you ok?", "be safe", "Hello i love nani trucilla and you hihi"];
 let juswa1 = juswa[Math.floor(Math.random() * juswa.length)];

    let moment = require("moment-timezone");
    let hours = moment.tz('Asia/Manila').format('HHmm');
    let session = (
    hours > 0001 && hours <= 400 ? "bright morning" : 
    hours > 401 && hours <= 700 ? "morning" :
    hours > 701 && hours <= 1000 ? "morning" :
    hours > 1001 && hours <= 1100 ? "morning" : 
    hours > 1100 && hours <= 1500 ? "afternoon" : 
    hours > 1501 && hours <= 1800 ? "evening" : 
    hours > 1801 && hours <= 2100 ? "evening" : 
    hours > 2101 && hours <= 2400 ? "late night and advance sleepwell" : 
    "error");
    var thu =
moment.tz('Asia/Manila').format('dddd');
  if (thu == 'Sunday') thu = 'sunday'
  if (thu == 'Monday') thu = 'monday'
  if (thu == 'Tuesday') thu = 'tuesday'
  if (thu == 'Wednesday') thu = 'wednesday'
  if (thu == "Thursday") thu = 'thursday'
  if (thu == 'Friday') thu = 'friday'
  if (thu == 'Saturday') thu = 'saturday'
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    let msg = {body: `Hi ${name}! happy ${thu}, have a good ${session} ${juswa1}`, mentions}
    api.sendMessage(msg, event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: sticker}, event.threadID);
      }, 100)
    }, event.messageID)
  }
  }
}

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
		"successText": `${this.config.name} thành công`,
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": `${this.config.name} success!`,
	}
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
	if (typeof data["hi"] == "undefined" || data["hi"] == true) data["hi"] = false;
	else data["hi"] = true;
	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}