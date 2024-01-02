const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'bans a mamber from the server.',
  // devOnly: Boolean,
  // testOnly: Boolean,
  option: [
    {
      name: 'target-user',
      description: 'The user to ban.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason',
      description: 'The reason for banning.',
      required: false,
      type: ApplicationCommandOptionType.String,
    }
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    interaction.reply('Ban...')
  }
}