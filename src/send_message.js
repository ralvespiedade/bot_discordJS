require('dotenv').config()
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
})

const roles = [
  {
    id: '1186625105565061120',
    label: 'FrontEnd'
  },
  {
    id: '1186625588874706955',
    label: 'BackEnd'
  },

]

client.on('guildMemberAdd', async (event) => {
  try {

    const newMember = await event.user.globalName
    console.log(newMember)

    const channel = await client.channels.cache.get('1180816513184313398')
    if (!channel) return;
    const row = new ActionRowBuilder();

    roles.forEach(role => {
      row.components.push(
        new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
      )
    })

    await channel.send({
      content: `Bem vindo, ${newMember}! Escolha seu cargo:`,
      components: [row]
    });
    process.exit()

  } catch (error) {
    console.error(error)
  }
})

client.login(process.env.TOKEN)