module.exports = (message) => {
    let member = message.mentions.members.first();
  
    return message.reply("used !reserve, " + message.author.username + " mentioned <@" + member.id + ">");
  };