const { testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

module.exports = async (client) => {
  //vamos precisar pegar todos os arquivos dentro de comandos
  try {
    const localCommands = getLocalCommands();
    
    const applicationCommands = await getApplicationCommands(client, testServer);
    
    //loop nos comandos comparando entre o localCommands e o applicationCommands
    //Qual a diferença entre um e outro? LocalCommands são criados para apenas 1 servidor
    //applicationCommands são criados para todos os servidores 
    //applicationCommands.delete('1186246241919696967')
    applicationCommands.cache.find((cmd) => console.log(cmd.name))
    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name 
      );
      
      

      if (existingCommand) {
        if (localCommand.deleted) {

          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑️ comamdo local: "${name}" deletado.`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options
          });
          console.log(`🔄️ Comando editado: ${name}`)
        }

      } else {
        if (localCommand.deleted) {
          console.log(`⏭️ Pulando registro do comando: ${name}, pois o mesmo está marcado como deletado.`);
          continue;
        }

        //Se o comando não existir e se não estiver marcado como deletado.
        await applicationCommands.create({
          name,
          description,
          options
        }) 

        console.log(`👍 Comando registrado: ${name}.`)
      }
    }

  } catch (error) {
    console.log(error)
  }
};