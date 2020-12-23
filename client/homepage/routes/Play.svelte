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

  const handleKeydown = event => {
    const { key } = event
    console.log(String.fromCharCode(event.which))
    if (key === 'Backspace') {
      prompt = prompt.substring(0, prompt.length - 1)
    } else if (key.match(/^[A-Za-z]+$/)){
      prompt += key
    }
  }

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
    document.body.addEventListener('keydown', handleKeydown)
    gameLoop()
  })

</script>

<style>
    
  #canvas-container {
    position: absolute;
  }

  #game-prompt {
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2em;
  }
</style>

<div id='canvas-container' bind:this={container}>
</div> 
<span id='game-prompt'>{prompt || 'type!'}</span>
