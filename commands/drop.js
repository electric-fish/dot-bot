module.exports = (message) => {
    let member = message.mentions.members.first();
  
    return message.reply("used !drop, " + message.author.username + " mentioned <@" + member.id + ">");
  };