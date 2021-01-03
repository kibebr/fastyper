<script>
  import { createCanvas, createCanvasRenderer } from '../utils/Canvas.js'
  import { createState } from '../../game/main.js' 
  import { fetchWordsFrom } from '../utils/fetcher.js'
  import { onMount } from 'svelte' 

  export let params

  const onWordDestroyed = word => {
    console.log('play received destroyed ', word)
    prompt = ''
  }

  const onGameOver = () => {
    console.log('game over')
  }

  const canvas = createCanvas({
    width: document.body.clientWidth,
    height: document.body.clientHeight
  })

  const renderer = createCanvasRenderer(canvas)
  const state = createState({ 
    width: canvas.width,
    height: canvas.height,
    callbacks: {
      onDestroy: onWordDestroyed,
      onOver: onGameOver
    }
  })

  let container
  let prompt = ''
  let gameState = 'RUNNING'

  onMount(async () => {
    const fetchedWords = await fetchWordsFrom('10')
    fetchedWords.forEach(state.addWord)

    const gameLoop = () => {
      state.update()

      renderer.clearCanvas()
      renderer.paintAll('black')

      state.getWords().forEach(renderer.renderWord)

      renderer.renderStars()

      window.requestAnimationFrame(gameLoop)
    }
  
    container.appendChild(canvas)
    state.startTimer()
    gameLoop()
  })

  $: {
    state.setPrompt(prompt)
  }

</script>

<style>
  #canvas-container {
    position: absolute;
  }

  input {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 1.5em;
    z-index: 1;
    background-color: transparent;
    color: white;
  }

  ::placeholder {
    color: white;
  }
</style>

<div id='canvas-container' bind:this={container}>
</div> 
<!-- warn-disable a11y-missing-attribute -->
<input 
     placeholder={gameState ? 'TYPE' : 'OVER'} 
     autofocus 
     spellcheck=false
     bind:value={prompt} 
     on:blur={({ target }) => target.focus()}
     on:paste={event => event.preventDefault()}
/>
