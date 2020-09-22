module.exports = (message) => {
    let member = message.mentions.members.first();
  
    return message.reply("used !clear, " + message.author.username + " mentioned <@" + member.id + ">");
  };