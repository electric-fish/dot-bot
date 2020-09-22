module.exports = (message) => {
  let member = message.mentions.members.first();

  return message.reply("used !test, " + message.author.username + " mentioned <@" + member.id + ">");
};