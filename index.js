const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

// import config from "./config.js";
const config = require('./config.js');



// fs.readdir("./events/", (err, files) => {
//   files.forEach(file => {
//     const eventHandler = require(`./events/${file}`);
//     const eventName = file.split(".")[0];
//     client.on(eventName, (...args) => eventHandler(client, ...args));
//   });
// });


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
  })
  client.on("message", (msg) => {
    if (msg.content === "ping") {
      msg.reply("Pong!")
    }
  })



client.login(config.token);