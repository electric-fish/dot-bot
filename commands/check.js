const { ClientUser } = require('discord.js');
const models = require('../database/models');
const embeds = require('./embeds');
const moment = require('moment');

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
      if (result.length === 0) {
        embeds.user.title = member.user.username + "#" + member.user.discriminator;
        embeds.user.description = 'Status: Inactive';
        embeds.user.fields[0].value = '-';
        embeds.user.timestamp = new Date();
        return message.channel.send({ embed: embeds.user });
      } else {

        // --- get all user related history--- //
        let user = {
          "status": "inactive",
          "history": [] // location, action, timestamp, comment
        }
        for (var i in result) {
          for (var k in result[i].history) {
            if (result[i].history[k].userid === member.user.id) {
              user.history.push({
                "location": result[i].location,
                "action": result[i].history[k].action,
                "timestamp": result[i].history[k].timestamp,
                "comment": result[i].history[k].comment
              });
            }
          }
        }

        // --- sort with timestamp --- //
        user.history.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        console.log(user);

        // --- check status --- //
        let historyStr = "";
        for (var i in user.history) {
          if (historyStr.length > 0) {
            historyStr += "\n";
          }
          historyStr += moment(user.history[i].timestamp).startOf('hour').fromNow();
          historyStr += " - ";
          switch (user.history[i].action) {
            case 'reserve':
              historyStr += `reserved (${user.history[i].location[0]}, ${user.history[i].location[1]}): `;
              break;
            case 'clear':
              historyStr += `cleared (${user.history[i].location[0]}, ${user.history[i].location[1]}): `;
              break;
            case 'drop':
              historyStr += `dropped (${user.history[i].location[0]}, ${user.history[i].location[1]}): `;
              break;
            default:
              break;
          }
          historyStr += user.history[i].comment;
        }
        // "[40 minutes ago](http://) - reserved (122, 106): \n[20 minutes ago](http://) - cleared (122,106): cleared by Dummy\n[10 minutes ago]() - reserved (122, 107):\n[2 minutes ago]() - dropped (122, 107): too hard"


        embeds.user.title = member.user.username + "#" + member.user.discriminator;
        embeds.user.fields[0].value = historyStr;
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
          embeds.tile.description = (tile.status === 'active') ? `Status: Reserved by <@${tile.userid}>` : 'Status: Inactive';
          embeds.tile.fields[0].value = `a lot of stuff is gonna come in here welp`;
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