const test = require("../commands/test");

module.exports = (client, message) => {
  if (message.content.startsWith("!test")) {
    return test(message);
  }
};


// client.on("message", (msg) => {
//   if (msg.content.startsWith("!test")) {
//     let member = msg.mentions.members.first();
//     msg.reply(msg.author.username + " mentioned <@" + member.id + ">");
//   }
// });