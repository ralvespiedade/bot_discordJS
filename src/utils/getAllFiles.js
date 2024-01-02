const fs = require('fs')
const path = require('path')

module.exports = (directory, foldersOnly = false) => {
  let fileNames = [];

  //files vai receber todas as pastas e arquivos que estiverem no diretório que for passado no parâmetro: 'directory'
  //o 2º parâmetro do readdirSinc vai nos ajudar a distinguir pastas e arquivos
  const files = fs.readdirSync(directory, { withFileTypes: true });
  
  //vamos passar por todas as pastas e arquivos
  //identificando quais são pasta e arquivo
  for (const file of files) {
    //recebe o caminho do arquivo ou pasta
    const filePath = path.join(directory, file.name);
    
    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }

  return fileNames;
};


