import { nextState, createNormalWordNode, deleteWord } from './main.js'
import { paintAll, clearCanvas, renderWord } from './canvasUtils.js'

const words = ['test', 'vitor', 'rodrigues']
const prompt = ''

let state = {
  entities: words.map(createNormalWordNode)
}

const canvas = document.getElementById('canvas')
paintAll('black')(canvas)

const gameLoop = () => {
  state = nextState(state)
  clearCanvas(canvas)
  paintAll('black')(canvas)
  state.entities.forEach(entity => {
    renderWord(entity)(canvas)
  })
  window.requestAnimationFrame(gameLoop)
}

document.body.addEventListener('click', () => {
  state = deleteWord('test')(state)
})

gameLoop()
