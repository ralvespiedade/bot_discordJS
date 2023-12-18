require('dotenv').config()
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');


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

client.on("guildMemberAdd", (memberAdd) => {
  console.log(`O usuário ${memberAdd.displayName} foi adicionado ao ${memberAdd.guild.name}`)
  //Teste: enviando um embed quando um membro for adicionado ao servidor
  const embed = new EmbedBuilder()
      .setTitle('Teste de Embed')
      .setDescription('Esse é o campo de descrição do embed.')
      //para usar uma cor especifica >> 0x + o hexadecimal da cor. Ex: '0xFFFFFF'
      //use 'Random' para cor aleatória
      .setColor(0x7600bc)
      .setFields(
        { 
          name: 'Nome do Field',
          value: 'Valor qualquer do field',
          inline: true
        },
        { 
          name: 'Nome do Field_2',
          value: 'Vegundo valor qualquer do field',
          inline: true
        },
      )

  memberAdd.send({embeds: [embed]})
})

client.on('interactionCreate', (interaction) => {
  //checa se a interação é referente a um comando slash
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "Hey") {
    
    interaction.reply(`${interaction.commandName} pra você também!`)

  };

  if (interaction.commandName === "ping") {

    interaction.reply("PONG!❤️")

  };

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get('primeiro-numero').value
    const num2 = interaction.options.get('segundo-numero').value

    interaction.reply(`${num1} + ${num2} = ${num1 + num2}`)
  };
  //Criando comando com embed
  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle('Teste de Embed')
      .setDescription('Esse é o campo de descrição do embed.')
      //para usar uma cor especifica >> 0x + o hexadecimal da cor. Ex: '0xFFFFFF'
      //use 'Random' para cor aleatória
      .setColor(0x7600bc)
      .setFields(
        { 
          name: 'Nome do Field',
          value: 'Valor qualquer do field',
          inline: true
        },
        { 
          name: 'Nome do Field_2',
          value: 'Vegundo valor qualquer do field',
          inline: true
        },
      )

    interaction.reply({ embeds: [embed] })
  };
  
})

client.login(process.env.TOKEN);
