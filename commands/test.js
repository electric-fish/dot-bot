const models = require('../database/models');
const embeds = require('./embeds');

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

    models.getUser(member.user)
    .then((result) => {
      if (result.length > 1) {
        return message.channel.send("Database error, please contact <@84383698778066944>.");
      } else if (result.length === 0) {
        embeds.user.title = member.user.username + "#" + member.user.discriminator;
        embeds.user.description = 'Status: Inactive';
        embeds.user.fields[0].value = '-';
        embeds.user.timestamp = new Date();
        return message.channel.send({ embed: embeds.user });
      } else {
        let user = result[0];
        embeds.user.title = user.username;
        embeds.user.description = (user.status === 'Inactive') ? `Status: Inactive` : `Status: Reserving (${user.location[0]}, ${user.location[1]})`;
        embeds.user.timestamp = new Date();
        return message.channel.send({ embed: embeds.user });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  // check tile
  else if (contentArr.length === 3) {
    let location = [parseInt(contentArr[1]), parseInt(contentArr[2])];
    if ( location[0] === NaN || location[1] === NaN || location[0] > 300 || location[1] > 300) {
      return message.reply(
        `please enter valid tile coordinates.`
      );
    }

    models.getTile(location)
      .then((result) => {
        if (result.length > 1) {
          return message.channel.send("Database error, please contact <@84383698778066944>.");
        } else if (result.length === 0) {
          embeds.tile.title = `(${location[0]}, ${location[1]})`;
          embeds.tile.description = 'Status: Inactive';
          embeds.tile.fields[0].value = '-';
          embeds.tile.timestamp = new Date();
          return message.channel.send({ embed: embeds.tile });
        } else {  
          let tile = result[0];  
          embeds.tile.title = `(${location[0]}, ${location[1]})`;
          embeds.tile.timestamp = new Date();
          return message.channel.send({ embed: embeds.tile });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  else {
    return message.reply(
      `please enter valid arguments.`
    );
  }
  
};