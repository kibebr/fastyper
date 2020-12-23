<script>
  import { createCanvasRenderer } from '../../game/canvasUtils.js'
  import { update, addWord, getWords, } from '../../game/main.js' 
  import { setBaseSpeed } from '../../game/modules/Speed.js'
  import { onMount } from 'svelte' 

  const canvas = document.createElement('canvas')
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  canvas.style.width = canvas.width
  canvas.style.height = canvas.height
  const renderer = createCanvasRenderer(canvas)
  let container

  onMount(() => {
    addWord('test')
    addWord('test')
    addWord('test')
    addWord('test')
    setBaseSpeed(canvas.width ** 0.0025)
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

    gameLoop()
    container.appendChild(canvas)
  })

</script>

<div bind:this={container}>
</div>
