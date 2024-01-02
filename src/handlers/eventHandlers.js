const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client) => {
  //lista dos caminhos de todas as pastas dentro da pasta events
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true)
  //Percorre todas as pastas, listando os caminhos dos arquivos e...
  //também lista o nome das subpastas (eventos)
  for (const eventFolder of eventFolders) {
    //lista os caminhos de todos os arquivos
    const eventFiles = getAllFiles(eventFolder)
    //Classificando do maior para o menor para poder priorizar eventos depois
    eventFiles.sort((a, b) => a > b);
    //substitui barras duplas por barra unica e...
    //encontra a ultima barra e armazena o restante da sting...
    //que é o nome do arquivo. Ex: 
    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()
    //console.log(eventName)//Nome da subPasta Ex.: InteractionCreate
    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        //importando cada evento
        const eventFunction = require(eventFile);
       //chamando cada evento 
        await eventFunction(client, arg);
        
      }

    })
  }
};