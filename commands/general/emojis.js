module.exports.run = async (client, message, args) => {  
 var ammount = 0;
const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  const emojiAmmount = message.guild.emojis.map(e=>ammount+=1);
  if(emojiList == "") {
   message.channel.send("this server has no custom emojis.") ;
    return;
  }
  message.channel.send(emojiList +" " + ammount + "/50");
}
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["e"],
  permLevel: "User"
};

exports.help = {
  name: "emojis",
  category: "Fun",
  description: "Lists custom server emojis.",
  usage: "e"
};