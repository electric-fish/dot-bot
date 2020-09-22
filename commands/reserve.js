const models = require('../database/models');
const controllers = require('./controllers');

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
  if ( isNaN(location[0])  || isNaN(location[1]) || location[0] > 300 || location[1] > 300) {
    message.react('❌');
    return message.reply(
      `please enter valid tile coordinates.`
    );    
  }

  let comment = contentArr.slice(3).join(' ');

  models.getTile(location)
  .then((result) => {
    if (result.length > 1) {

      message.react('❌');
      return message.channel.send("Database error, please contact <@84383698778066944>.");

    } else if (result.length === 0) {

      models.insertTile(message.author, location, comment)
      .then(() => {
        return controllers.updateUser(message.author, location, comment, "reserve");
      })
      .then(() => {
        message.react('✅');;
      })
      .catch((err) => {
        message.react('❌');
        console.log(err);
      });

    } else {

      let tile = result[0];
      if (tile.status === "Reserved") {
        message.react('❌');
        return message.reply(
          `that tile is currently reserved, use !check to find out more.`
        );
      } else {
        // actually reserve that damn tile
        let comment = contentArr.slice(3).join(' ');

        models.reserveTile(message.author, location, comment, tile)
        .then(() => {
          return controllers.updateUser(message.author, location, comment, "reserve");
        })
        .then(() => {
          message.react('✅');
        })
        .catch((err) => {
          message.react('❌');
          console.log(err);
        });

      }
    }
  })
  .catch((err) => {
    message.react('❌');
    console.log(err);
  });

  // return message.reply("reserve has been run.");

};