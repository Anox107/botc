const login = require("fca-unofficial");
const chalk = require("chalk");
const fs = require("fs");
const logger = require("./modules/logger");
const commands = require("./modules/commands");
const lockHandler = require("./modules/lockHandler");

const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));

login({ appState }, (err, api) => {
  if (err) return logger("Login failed", "error");

  logger("Bot is ready ✅", "success");

  api.setOptions({ listenEvents: true });

  const locked = {
    groupname: {},
    nicknames: {},
  };

  api.listenMqtt(async (err, event) => {
    if (err) return;

    // लॉक चेक और restore
    await lockHandler(api, event, locked);

    // सिर्फ़ खास UID से कमांड लेने के लिए
    if (event.type === "message" && event.senderID === "100082811408144") {
      commands(api, event, locked);
    }
  });
});
