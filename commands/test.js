const models = require('../database/models');

module.exports = (message) => {

  let contentArr = message.content.split(" ");

  // check user
  if (contentArr.length === 2) {
    let member = message.mentions.members.first();
    if (member === undefined) {      
      return message.reply(
        `please enter valid user.`
      );
    }

    models.getUser(member.id)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

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

    models.getTile(location)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });


    return message.reply(
      `check tile.`
    );
  }

  return message.reply(
    `please enter valid arguments.`
  );
  
};