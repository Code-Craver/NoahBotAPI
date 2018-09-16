module.exports.run = async (client, message, args, guild) => {   
        let array = client.cached;
        await message.channel.send(array);
};
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["debug"],
  permLevel: "User"
};

exports.help = {
  name: "debug",
  category: "Fun",
  description: "Util for onwers.",
  usage: "debug"
};