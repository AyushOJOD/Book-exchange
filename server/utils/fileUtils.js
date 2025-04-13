const fs = require("fs");
const path = require("path");

const readData = (fileName) => {
  const filePath = path.join(__dirname, "..", "data", fileName);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
};

const writeData = (fileName, data) => {
  const filePath = path.join(__dirname, "..", "data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readData,
  writeData,
};
