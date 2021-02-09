import { getRandomNumFromRange } from '../utils.js'

export const createGame = (callbacks, boundaries) => {
  let speed = 1
  const wordObjs = []

  const createWordObj = name => {
    const randomNum = Math.random()
    const wordObj = ({
      name,
      pos: [
        getRandomNumFromRange(-200, 0),
        getRandomNumFromRange(10, boundaries[1])
      ]
    })

    if (randomNum <= 0.1) {
      wordObj.tag = 'BOMB'
    } else {
      wordObj.tag = 'NORMAL'
    }
    
    return wordObj
  }

  return {
    update: () => {
      wordObjs.forEach(wordObj => {
        wordObj.pos[0] += (boundaries[0] / 2000) * speed

        if (wordObj.tag === 'BOMB' && wordObj.pos[0] > boundaries[0]) {
          callbacks.onOver()
        }
      })
    },
    addWord: word => wordObjs.push(createWordObj(word)),
    changePrompt: p => {
      const index = wordObjs.findIndex(w => w.name === p)
      
      if (index !== -1) {
        if (wordObjs[index].tag === 'NORMAL') {
          callbacks.onWordDestroyed(wordObjs[index])
          wordObjs.splice(index, 1)
        }
        else {
          callbacks.onOver()
        }
      }
    },
    getWordObjs: () => wordObjs
  }
}
