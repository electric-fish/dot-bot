const test = require("../commands/test");
const check = require("../commands/check");
const reserve = require("../commands/reserve");
const clear = require("../commands/clear");
const drop = require("../commands/drop");

module.exports = (client, message) => {
//   if (message.channel.name === 'dot-ground') {
  if (message.channel.name === 'test') {
    if (message.content.startsWith("!test")) {
      return test(message);
    } else if (message.content.startsWith("!check")) {
      return check(message);
    } else if (message.content.startsWith("!reserve")) {
      return reserve(message);
    } else if (message.content.startsWith("!clear")) {
      return clear(message);
    } else if (message.content.startsWith("!drop")) {
      return drop(message);
    }
  }
};