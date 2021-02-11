  /*/
 *
 *  used to store word lists without any validation (not used in api)
 *  
 *  ARGUMENTS:
 *  0 - file that contains the words (only supports .txt for now)
 *  1 - delimeter (default \n)
 *
  /*/

const fs = require('fs').promises
const pg = require('pg')

const supportedFiletypes = ['.txt']

const args = process.argv.slice(2)
const filename = args[0]
const delimiter = args[1] || '\n'

class File {
  static read = async (filename) => await fs.readFile(filename, 'utf-8')
}

const run = async () => {
  if (!filename) {
    console.error('Insert a filename as the first argument.')
    process.exit()
  }

  const filetype = supportedFiletypes.find(ft => filename.endsWith(ft))

  if (!filetype) {
    console.error('Filetype not supported. Supported filetypes: ' + supportedFiletypes)
    process.exit()
  }

  if (filetype === '.txt') {
    const file = await File.read(filename)
    const words = file.split(delimiter)
    words.pop()
    console.log(words)
  }
}

run()
