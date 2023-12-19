require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

export const commands = [
  {
    name: 'hey',
    description: 'reply with hey'
  },
  {
    name: 'ping',
    description: 'reply with pong'
  },
  {
    name: 'add',
    description: "Adicionar números",
    options: [
      {
       name: 'primeiro-numero',
       description: 'primeiro numero',
       type: ApplicationCommandOptionType.Number,
       choices: [
        {
          name: 'um',
          value: 1
        },
        {
          name: 'dois',
          value: 2
        },
        {
          name: 'tres',
          value: 3
        },
        {
          name: 'quatro',
          value: 4
        },

       ],
       required: true
      },
      {
        name: 'segundo-numero',
        description: 'segundo numero',
        type: ApplicationCommandOptionType.Number,
        required: true
       },

    ]

  },

  {
    name: 'embed',
    description: 'Envia um embed!',
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