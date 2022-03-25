require('dotenv').config()
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"]})

var miles = 0
var numRegEx = /[^a-zA-Z.!?#$%^&*()_+= <>]+(?![^<]*>)/;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
    if(msg.author.bot) return false;

    if(msg.content.includes("@here") || msg.content.includes("@everyone") || msg.type == "REPLY") return false;

    if(msg.mentions.has(client.user.id)) {
      if(msg.content.includes("add")) {
        miles += parseInt(msg.content.match(numRegEx));
        msg.channel.send(miles + " miles have been added to debt.");
      }
      if(msg.content.includes("reset")) {
        miles = 0;
        msg.channel.send("Mileage debt has been reset")
      }
      if(msg.content.includes("ran")) {
        miles -= parseInt(msg.content.match(numRegEx));
        msg.channel.send(miles + " miles have been subtracted from debt.");
      }
      if(msg.content.includes("status")) {
        msg.channel.send("Brian owes Mark " + miles + " miles.");
      }
      if(msg.content.includes("help")) {
        msg.channel.send("to add miles, type 'add' and the number of miles to add \n to reset number of miles type 'reset' \n to check number of miles type 'status'");
      }
      if(msg.content.includes("insult")) {
        msg.channel.send("Melody sucks");
      }
    }
})

client.on('error', (e) => console.error(e));
client.on('warning', (e) => console.warn(e));
client.on('debug', (e) => console.info(e));
console.log(process.env.TOKEN)
client.login(process.env.TOKEN)