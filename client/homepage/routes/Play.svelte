<script>
  import { clearCanvas, paintAll, renderWord } from '../../game/canvasUtils.js'
  import { update, addWord, getWords, c } from '../../game/main.js' 
  import { setBaseSpeed } from '../../game/modules/Speed.js'
  import { onMount } from 'svelte' 

  const canvas = document.createElement('canvas')
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight

  let container

  onMount(() => {
    addWord('test')
    setBaseSpeed(canvas.width ** 0.025)
    const gameLoop = () => {
      update()
      clearCanvas(canvas)
      paintAll('white')(canvas)
      getWords()
        .forEach(word => {
          renderWord(word)(canvas)
        })
      window.requestAnimationFrame(gameLoop)
    }

    gameLoop()
    container.appendChild(canvas)
  })

</script>

<div bind:this={container}>
</div>
