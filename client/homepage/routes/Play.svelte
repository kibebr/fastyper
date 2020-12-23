<script>
  import { createCanvas, createCanvasRenderer } from '../../game/canvasUtils.js'
  import { update, addWord, getWords, } from '../../game/main.js' 
  import { setBaseSpeed } from '../../game/modules/Speed.js'
  import { onMount } from 'svelte' 

  const canvas = createCanvas({
    width: document.body.clientWidth,
    height: document.body.clientHeight
  })
  const renderer = createCanvasRenderer(canvas)

  let container
  let prompt = ''

  onMount(() => {
    addWord('test')
    addWord('test')
    addWord('test')
    addWord('test')
    const gameLoop = () => {
      update()
      renderer.clearCanvas()
      renderer.paintAll('black')
      getWords()
        .forEach(word => {
          renderer.renderWord(word)
        })
      renderer.renderStars()
      window.requestAnimationFrame(gameLoop)
    }
  
    container.appendChild(canvas)
    gameLoop()
  })

  $: console.log(prompt)
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
<input placeholder='TYPE' autofocus bind:value={prompt}/>
