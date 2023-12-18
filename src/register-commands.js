require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'hey',
    description: 'reply with hey'
  },
  {
    name: 'ping',
    description: 'reply with pong'
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

//Função que registra os comandos
(async () => {
  try {
    console.log('Registrando comandos de slash "/"...');

    
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    )

    console.log('Comandos de slash "/" registrados com sucesso!')
  } catch (error) {
    console.error(`Ocorreu um erro: ${error}`);
  }
})();