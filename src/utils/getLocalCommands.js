const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
  var localCommands = [];
  //Lista dos caminhos das subpastas de commands
  const commandCategories = getAllFiles(path.join(__dirname, "..", "commands"), true)
  
  //Looping através das pastas dentro de commands
  for (const commandCategory of commandCategories) {
    //armazenando caminho dos arquivos
    const commandFiles = getAllFiles(commandCategory);
    
    //Looping através dos caminhos dos arquivos importando os arquivos dentro
    //das subpastas de commands
    for (const commandFile of commandFiles) {

      const commandObject = require(commandFile);
      //Se o nome do comando está incluido nas exceções, continue.
      if (exceptions.includes(commandObject.name)) {
        continue;
      }
      localCommands.push(commandObject);

    };
  };
  
  return localCommands;
};