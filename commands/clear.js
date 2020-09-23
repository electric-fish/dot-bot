const models = require('../database/models');

module.exports = (message) => {

  let member = message.mentions.members.first();

  let contentArr = message.content.split(" ");
  if (contentArr.length < 2) {
    message.react('❌');
    return message.reply(
      `please enter valid arguments.`
    );
  }

  let location = [parseInt(contentArr[1]), parseInt(contentArr[2])];
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

      // --- tile untouched --- //

      if (tileData.length === 0) {
        message.react('❌');
        return message.reply(`that tile is currently not reserved.`);    
      } else {
    
        let tile = tileData[0];
        
      // --- tile currently reserved, clear it --- //

        if (tile.status === "active") {
          
          models.clearTile(message.author, location, comment, tile)
          .then(() => {
            message.react('✅');;
          })
          .catch((err) => {
            message.react('❌');
            message.channel.send("Unknown error, please contact <@84383698778066944>.");
            console.log(err);
          });

      // --- tile status === 'inactive' --- //
        } else {
          message.react('❌');
          return message.reply(`that tile is currently not reserved.`);    
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