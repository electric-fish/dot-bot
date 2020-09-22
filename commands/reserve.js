module.exports = (message) => {
  let member = message.mentions.members.first();

  // let contentStr = message.content;
  let contentArr = message.content.split(" ");
  // console.log(contentArr);
  if (contentArr.length < 2) {
    return message.reply(
      `please enter valid arguments.`
    );
  }

  let location = [parseInt(contentArr[1]), parseInt(contentArr[2])];
  // console.log(location);
  if ( location[0] === NaN || location[1] === NaN || location[0] > 300 || location[1] > 300) {
    return message.reply(
      `please enter valid tile coordinates.`
    );
  }

  let comment = contentArr.slice(3).join(' ');
  // console.log(comment);


  return message.reply("reserve has been run.");
  // return message.reply("used !reserve, " + message.author.username + " mentioned <@" + member.id + ">");
};