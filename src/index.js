require('dotenv').config()
const { Client, IntentsBitField } = require('discord.js');


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent 
    
  ]
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.username} online e a todo vapor!!`)
});

client.on("messageCreate", (message) => {

  if (message.content == 'Olá') {
    message.reply('StarWars é bom d++')
  }

})

client.on("guildMemberAdd", (member) => {
  console.log(member)
})

client.login(process.env.TOKEN);
