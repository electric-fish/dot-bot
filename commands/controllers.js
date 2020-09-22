const models = require('../database/models');

let controllers = {
  updateUser: (user, location, comment, status) => {
    return new Promise((resolve, reject) => {
      models.getUser(message.author)
      .then((result) => {
        if (result.length > 1) {
          return message.channel.send("Database error, please contact <@84383698778066944>.");
        } else if (result.length === 0) {
        //   let data;
        //   insertUser(message.author, location, data);
        } else {
        //   let data;
        //   updateUser(message.author, location, data);
        }
      })
      .catch((err) => {
        console.log(err);
      });



      resolve();
    });
  },
}

module.exports = controllers;