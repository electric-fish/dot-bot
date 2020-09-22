const models = require('../database/models');

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
    return message.reply(
      `please enter valid tile coordinates.`
    );
  }

  let comment = contentArr.slice(3).join(' ');

  models.getTile(location)
  .then((result) => {
    if (result.length > 1) {
      return message.channel.send("Database error, please contact <@84383698778066944>.");
    } else if (result.length === 0) {

      models.insertTile(message.author, location, comment)
      .then((result) => {
      })
      .catch((err) => {
        console.log(err);
      });

    } else {  
      let tile = result[0];
      if (tile.status === "Reserved") {
        return message.reply(
          `that tile is currently reserved, use !check to find out more.`
        );
      } else {
        // actually reserve that damn tile
        let comment = contentArr.slice(3).join(' ');

        models.reserveTile(message.author, location, comment, tile)
        .then((result) => {
        })
        .catch((err) => {
          console.log(err);
        });
        
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });



  // models.getUser(message.author)
  // .then((result) => {
  //   if (result.length > 1) {
  //     return message.channel.send("Database error, please contact <@84383698778066944>.");
  //   } else if (result.length === 0) {
  //     let data;
  //     insertUser(message.author, location, data);
  //   } else {
  //     let data;
  //     updateUser(message.author, location, data);
  //   }
  // })
  // .catch((err) => {
  //   console.log(err);
  // });












  // let comment = contentArr.slice(3).join(' ');
  // console.log(comment);

  // return message.reply("reserve has been run.");

};