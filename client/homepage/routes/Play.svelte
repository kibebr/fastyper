<script>
  import { createCanvas, createCanvasRenderer } from '../utils/Canvas.js'
  import { createGame } from '../../domain/game.js' 
  import { fetchWordNode } from '../services/WordService.js'
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
    width: document.body.clientWidth - 50,
    height: document.body.clientHeight
  })
  const renderer = createCanvasRenderer(canvas)
  const game = createGame({
    onOver: onGameOver,
    onWordDestroyed
  }, [canvas.width, canvas.height])

  let container
  let prompt = ''
  let gameState = 'RUNNING'

  onMount(async () => {
    const wordNode = await fetchWordNode(params.id)
    wordNode.words.forEach(game.addWord)
    const gameLoop = () => {
      game.update()
      renderer.clearCanvas()
      renderer.paintAll('black')
      renderer.renderStars()
      game.getWordObjs().forEach(renderer.renderWordObj)
      window.requestAnimationFrame(gameLoop)
    }
  
    container.appendChild(canvas)
    gameLoop()
  })

  $: game.changePrompt(prompt)
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
