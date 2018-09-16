module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  
  
  if(client.config.updating){
      client.user.setPresence({
        game: {
            name: `http://bit.ly/noahbot : ${client.config.version}`,
            type: "STREAMING",
            url: "https://twitch.tv/tuxuni"
        }
    });
  await client.user.setStatus('idle')
  .catch(console.error);
} else {
      client.user.setPresence({
        game: {
            name: `version ${client.config.version} : @noah help`,
            type: "STREAMING",
            url: "https://twitch.tv/tuxuni"
        }
    });
}
  
  

};
