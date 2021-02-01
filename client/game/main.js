import { getRandomNumFromRange } from '../utils.js'


export const createGame = (callbacks, boundaries) => {
  let speed = 1
  const wordObjs = []

  const createWordObj = name => ({
    name,
    pos: [
      getRandomNumFromRange(-200, 0),
      getRandomNumFromRange(10, boundaries[1])
    ]
  })

  return {
    update: () => {
      wordObjs.forEach(wordObj => {
        wordObj.pos[0] += boundaries[0] / 2000
      })
    },
    addWord: word => wordObjs.push(createWordObj(word)),
    changePrompt: p => {
      const badWord = wordObjs.findIndex(w => w.name === p)
      
      if (badWord !== -1) {
        callbacks.onWordDestroyed(wordObjs[badWord])
        wordObjs.splice(badWord, 1)
      }
    },
    getWordObjs: () => wordObjs
  }
}
