<script>
  import { createCanvas, createCanvasRenderer } from '../utils/Canvas.js'
  import { createGame } from '../../core/game.js' 
  import { fetchWordNode } from '../services/WordService.js'
  import { onMount } from 'svelte' 

  export let params

  let wave = 1
  let seconds = 0
  let minutes = 0
  let characters = 0
  let score = 0
  let wpm = 0

  let timer = null
  let container
  let prompt = ''
  let isGameRunning = true
  let inputElement

  let wordList

  const calculatePoints = word => word.length * 2

  const onWordDestroyed = word => {
    const points = calculatePoints(word)
    characters += word.name.length
    score += points
    prompt = ''

    if (game.getWordObjs().length <= 10) {
      const wordsToPush = wordList.words.slice(0, 10)
      game.addWords(wordsToPush)
      console.log(game.getWordObjs().length)
    }

    renderer.addDestroyedScore(word, points)
  }

  const onGameOver = () => {
    isGameRunning = false
    prompt = 'GAME OVER'
    clearInterval(timer)
  }

  const canvas = createCanvas({
    width: document.body.clientWidth - 50,
    height: document.body.clientHeight
  })
  const renderer = createCanvasRenderer(canvas)
  const game = createGame({
    onOver: onGameOver,
    onWordDestroyed
  }, [canvas.width, canvas.height])

  onMount(async () => {
    wordList = await fetchWordNode(params.id)

    const gameLoop = () => {
      game.update()


      renderer.clearCanvas()
      renderer.paintAll('black')
      renderer.renderStars()
      renderer.renderWPM(wpm)
      renderer.renderScore(score)
      renderer.renderDestroyedScores()
      renderer.renderSeconds(seconds)
      game.getWordObjs().forEach(renderer.renderWordObj)

      if (isGameRunning) {
        window.requestAnimationFrame(gameLoop)
      }
    }
  
    container.appendChild(canvas)
    gameLoop()

    timer = setInterval(() => {
      seconds += 1
    }, 1000)
  })

  $: {
    console.log('wave changed: ', wave)
    if (wordList) {
      const toPush = wordList.words.slice(0, 4)
      game.addWords(toPush)
    }
  }
  $: game.changePrompt(prompt)
  $: minutes = seconds / 60
  $: wpm = (characters / 5) / minutes | 0
  $: {
    console.log(isGameRunning)
    if (!isGameRunning) {
      prompt = 'GAME OVER'
      console.log('test')
    }
  }
</script>

<style>
  #canvas-container {
    position: absolute;
    z-index: -1;
  }

  input {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 1.8em;
    z-index: 1;
    background-color: transparent;
    color: white;
    outline: none;
  }

  ::placeholder {
    color: white;
  }
</style>

<div id='canvas-container' bind:this={container}>
</div> 
<!-- warn-disable a11y-missing-attribute -->
<input 
     class='border-b-2 border-dotted'
     placeholder={isGameRunning ? 'TYPE' : 'GAME OVER'} 
     autofocus 
     spellcheck=false
     disabled={!isGameRunning}
     style='color: {isGameRunning ? 'white' : 'red'}'
     bind:value={prompt} 
     on:blur={({ target }) => target.focus()}
     on:paste={event => event.preventDefault()}
     bind:this={inputElement}
/>
