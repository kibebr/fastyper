import { nextState, createNormalWordNode } from './main.js'
import { paintAll, clearCanvas, renderWord } from './canvasUtils.js'

const words = ['test', 'vitor', 'rodrigues']

let state = {
  wordNodes: words.map(createNormalWordNode)
}

const canvas = document.getElementById('canvas')
paintAll('black')(canvas)

const gameLoop = () => {
  state = nextState(state)
  clearCanvas(canvas)
  paintAll('black')(canvas)
  state.wordNodes.forEach(wordNode => {
    renderWord(wordNode)(canvas)
  })
  window.requestAnimationFrame(gameLoop)
}

gameLoop()
