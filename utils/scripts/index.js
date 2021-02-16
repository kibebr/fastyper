  /*/
 *
 *  used to store word lists without any validation (not used in api)
 *  
 *  ARGUMENTS:
 *  0 - file that contains the words (only supports .txt for now)
 *  1 - delimeter (default \n)
 *
  /*/

import { readFile } from 'fs/promises'
import pg from 'pg'
const { Client } = pg
import { createSample } from './utils.js'
import dotenv from 'dotenv'

dotenv.config()

const supportedFiletypes = ['.txt']
const args = process.argv.slice(2)
const filename = args[0]
const delimiter = args[1] || '\n'

const pgDatabase = () => {
  let client = null

  return {
    connect: async () => {
      client = new Client({
        connectionString: process.env.PG_URL
      })
      await client.connect()
    },

    insertWordList: async (wordList) => await client.query(
      'INSERT INTO word_lists(id, title, difficulty, words) VALUES($1, $2, $3, $4)', 
      [wordList.id, wordList.title, wordList.difficulty, wordList.words]
    )
  }
}

class File {
  static read = async (filename) => await readFile(filename, 'utf-8')
}

const run = async (repo) => {
  if (!filename) {
    console.error('Insert a filename as the first argument.')
    process.exit()
  }

  const filetype = supportedFiletypes.find(ft => filename.endsWith(ft))

  if (!filetype) {
    console.error('Filetype not supported. Supported filetypes: ' + supportedFiletypes)
    process.exit()
  }

  const file = await File.read(filename)
  const words = file.split(delimiter)
  words.pop()

  try {
    await repo.insertWordList(createSample(words))
  } catch (err) {
    console.error(err)
  }
}

(async () => {
  const repo = pgDatabase()
  await repo.connect()
  await run(repo)
  console.log('All good.')
})()
