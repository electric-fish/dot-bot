const models = require('../database/models');

let controllers = {
  updateUser: (user, location, comment, status) => {
    return new Promise((resolve, reject) => {
      models.getUser(user)
      .then((result) => {

        if (result.length > 1) {

          reject("Database error, please contact <@84383698778066944>.");

        } else if (result.length === 0) {
            
          models.insertUser(user, location, comment, status)
          .then(() => {
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });

        } else {

            models.updateUser(user, location, comment, status, result[0])
            .then(() => {
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        }

      })
      .catch((err) => {
        console.log(err);
        reject();
      });
    });
  },
}

module.exports = controllers;