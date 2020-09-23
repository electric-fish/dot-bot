const models = require('../database/models');
// const controllers = require('./controllers');

module.exports = (message) => {

  let member = message.mentions.members.first();

  // let contentStr = message.content;
  let contentArr = message.content.split(" ");
  // console.log(contentArr);
  if (contentArr.length < 2) {
    message.react('❌');
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
  .then((tileData) => {

    if (tileData.length > 1) {

      message.react('❌');
      message.channel.send("Database error, please contact <@84383698778066944>.");

    } else {

      // --- tile untouched, reserve --- //

      if (tileData.length === 0) {

        models.insertTile(message.author, location, comment)
        .then(() => {
          message.react('✅');
        })
        .catch((err) => {
          message.react('❌');
          message.channel.send("Unknown error, please contact <@84383698778066944>.");
          console.log(err);
        });
    
      } else {
    
        let tile = tileData[0];
        
      // --- tile currently reserved --- //

        if (tile.status === "active") {
          message.react('❌');
          return message.reply(
            `that tile is currently reserved. Use !check <x coordinate> <y coordinate> to find out more.`
          );

      // --- tile has been dropped or cleared, reserve --- //
        } else {
          let comment = contentArr.slice(3).join(' ');
    
          models.reserveTile(message.author, location, comment, tile)
          .then(() => {
            message.react('✅');;
          })
          .catch((err) => {
            message.react('❌');
            message.channel.send("Unknown error, please contact <@84383698778066944>.");
            console.log(err);
          });
    
        }
      }

    }
    
  })
  .catch((err) => {
    message.react('❌');
    message.channel.send("Unknown error, please contact <@84383698778066944>.");
    console.log(err);
  });

};