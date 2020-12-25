<script>
  import { createCanvas, createCanvasRenderer } from '../../game/canvasUtils.js'
  import { update, addWord, getWords, findAndDeleteWord, startTimer, setPrompt, createState } from '../../game/main.js' 
  import { fetchWordsFrom } from '../utils/fetcher.js'
  import { onMount } from 'svelte' 

  const onWordDestroyed = word => {
    console.log('play received destroyed ', word)
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
      onDestroy: onWordDestroyed
    }
  })

  let container
  let prompt = ''

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
     placeholder='TYPE' 
     autofocus 
     spellcheck=false
     bind:value={prompt} 
     on:blur={({ target }) => target.focus()}
     on:paste={event => event.preventDefault()}
/>
