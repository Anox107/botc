module.exports = async function(api, event, locked) {
  const { threadID, body } = event;

  const args = body.trim().split(" ");
  const cmd = args[0].toLowerCase();
  const text = args.slice(1).join(" ");

  switch (cmd) {
    case "grpname":
      if (!text) return api.sendMessage("⚠️ नया ग्रुप नाम दो।", threadID);
      await api.setTitle(text, threadID);
      api.sendMessage("✅ ग्रुप नाम बदल दिया गया।", threadID);
      break;

    case "nickall":
      if (!text) return api.sendMessage("⚠️ नया nickname दो।", threadID);
      api.getThreadInfo(threadID, (err, info) => {
        if (err) return;
        info.participantIDs.forEach(id => {
          api.changeNickname(text, threadID, id);
        });
        api.sendMessage("✅ सबके nicknames बदल दिए गए।", threadID);
      });
      break;

    case "lockname":
      locked.groupname[threadID] = true;
      api.sendMessage("🔒 ग्रुप नाम लॉक हो चुका है।", threadID);
      break;

    case "unlockname":
      delete locked.groupname[threadID];
      api.sendMessage("🔓 ग्रुप नाम अनलॉक किया गया।", threadID);
      break;

    case "locknick":
      locked.nicknames[threadID] = true;
      api.sendMessage("🔒 Nicknames लॉक हो चुके हैं।", threadID);
      break;

    case "unlocknick":
      delete locked.nicknames[threadID];
      api.sendMessage("🔓 Nicknames अनलॉक हो चुके हैं।", threadID);
      break;

    default:
      api.sendMessage("⚠️ अज्ञात कमांड।", threadID);
  }
};
