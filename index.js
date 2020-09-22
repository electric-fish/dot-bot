const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require('./config.js');

fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});

client.login(config.token);