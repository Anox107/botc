module.exports = async function(api, event, locked) {
  const { threadID, logMessageType, logMessageData } = event;

  // अगर ग्रुपनाम लॉक है और बदल गया हो
  if (logMessageType === "log:thread-name" && locked.groupname[threadID]) {
    api.setTitle(logMessageData.name || "Locked Group", threadID);
  }

  // अगर किसी का nickname बदला गया हो और लॉक है
  if (
    logMessageType === "log:thread-nickname" &&
    locked.nicknames[threadID]
  ) {
    const userID = logMessageData.participant_id;
    api.changeNickname("Locked", threadID, userID);
  }
};
