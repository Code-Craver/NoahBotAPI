
// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util");
const fs = require("fs");
const Enmap = require("enmap");
const EnmapLevel = require("enmap-sqlite");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new Discord.Client();






// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger
client.logger = require("./modules/Logger");

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome Enhanced Map module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.cached = [];
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.
const ejs = require('ejs')
var express = require('express');
const app = express();
client.on('ready', () => {

try {
  panel();
} catch(e) {
  global.panelStatus = false;
}
  
})


const panel = async () => {
  app.set('view engine', 'ejs');
  
  app.get('/', function(req, res) {
    res.render(__dirname + '/views/index', {users: client.users.size, guilds: client.guilds.size});
   });
  
  var listener = app.listen(process.env.PORT, function() {
  console.log('Website up! :  ' + listener.address().port);
    global.panelStatus = true;
  });    

  app.use(express.static(__dirname + '/public'));

  app.get('/panel', function(req, res){
  res.render(__dirname + '/public/panel');
  });

  app.get('/docs', async (req, res) => {
  res.render(__dirname + '/public/docs', {files: await fs.readdirSync("./commands/")});
  });
  
}
  
const init = async () => {
  


  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const categories = fs.readdirSync("./commands/");
 client.commands = []
  for (let category of categories) {
    let commands = fs.readdirSync(`./commands/${category}/`)
    for (let file of commands) {
      let commandName = file.slice(0,-3)
      try {
        // console.log(file)
        let command = require(`./commands/${category}/${file}`)
        client.commands.push({
          usage:[commandName].concat(command.help.usage || []),
          category: category,
          name: commandName,
          pkg: command,
          aliases: [commandName].concat(command.conf.aliases || [])
        })
      } catch (err) {
        console.log(`Command not properly loaded: ${commandName}`)
      }
    }
 }

  // Then we load events, which will include our message and ready event.
  const evtFiles = await fs.readdirSync("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  await client.login(client.config.token);
// End top-level async/await function.
};

init();
global.messages = [];


