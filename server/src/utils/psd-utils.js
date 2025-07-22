const path = require("path");

exports.getPsdFilePath = (fileName) => {
  return path.join(__dirname, "./../assets", fileName);
};
