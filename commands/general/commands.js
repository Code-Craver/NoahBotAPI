const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);  
module.exports.run = async (client, message, args, level) => {  
const cmdFiles = await readdir("./commands/");
  let out = '';
  await cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    out += `${message.settings.prefix}${f.replace(".js", '')}\n`;
  });
  message.channel.send(out);
};
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cmds"],
  permLevel: "User"
};

exports.help = {
  name: "commands",
  category: "Misc",
  description: "Lists all commands.",
  usage: "commands"
};