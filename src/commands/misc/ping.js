module.exports = {
  name: 'ping',
  description: 'pong',
  // devOnly: Boolean,
  // testOnly: Boolean,
  // opition: object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },

};

