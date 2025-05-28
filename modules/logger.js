const chalk = require("chalk");

module.exports = (text, type = "log") => {
  switch (type) {
    case "warn":
      console.log(chalk.hex("#FF00FF").bold("[ Warn ] » ") + text);
      break;
    case "error":
      console.log(chalk.hex("#ff334b").bold("[ Error ] » ") + text);
      break;
    case "success":
      console.log(chalk.hex("#00ff00").bold("[ Success ] » ") + text);
      break;
    default:
      console.log(chalk.hex("#ffffff").bold("[ Log ] » ") + text);
      break;
  }
};
