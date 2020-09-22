module.exports = (message) => {
    let member = message.mentions.members.first();
  
    return message.reply("used !check, " + message.author.username + " mentioned <@" + member.id + ">");
  };