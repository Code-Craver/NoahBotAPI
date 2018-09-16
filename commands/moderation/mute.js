exports.run = (client, message, [mention, ...reason]) => {
  if (!mention)
    return message.reply("Please mention a user to mute");
  if (!message.guild.me.permissions.has("ADMINISTRATOR"))
    return message.reply("i don't have permission");
  const muteMember = mention;
  try {
  const Channels = message.guild.Channels.map(c => c.id)
  Channels.foreach(ch => {
    let chan = client.channels.get("id", ch)
    chan.overwritePermissions(muteMember,{'SEND_MESSAGES':false});
  });
    message.reply(`${muteMember.user.username} was succesfully muted for : \`${reason}\` `);
} catch (e) {
  console.log(e);
}

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "mute",
  category: "Moderation",
  description: "It... like... mutes.",
  usage: "mute"
};