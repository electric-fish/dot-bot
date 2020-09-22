module.exports = (message) => {
  let contentArr = message.content.split(" ");

  // check user
  if (contentArr.length === 2) {

    let member = message.mentions.members.first();

    return message.reply(
      `check user.`
    );
  }
  
  // check tile
  if (contentArr.length === 3) {
    let location = [parseInt(contentArr[1]), parseInt(contentArr[2])];
    if ( location[0] === NaN || location[1] === NaN || location[0] > 300 || location[1] > 300) {
      return message.reply(
        `please enter valid tile coordinates.`
      );
    }
    return message.reply(
      `check tile.`
    );
  }

  return message.reply(
    `please enter valid arguments.`
  );
};