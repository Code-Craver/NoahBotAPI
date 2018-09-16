const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { //eslint-disable-line no-unused-vars
    const emb = new Discord.RichEmbed()
    .setTitle("Bot Status")
    .addField("Panel status: ", global.panelStatus)
    message.channel.send(emb);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "status",
  category: "Miscelaneous",
  description: "Displays status of core modules.",
  usage: "status"
};
