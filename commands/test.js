const models = require('../database/models');
const embeds = require('./embeds');

module.exports = (message) => {

  console.log(`${message.author.username}#${message.author.discriminator}`);
  
};