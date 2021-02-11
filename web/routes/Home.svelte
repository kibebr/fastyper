<script>
  import { onMount, tick } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { fade } from 'svelte/transition'
  import { renderStars, renderWord, paintAll, getRandomNumFromRange } from '../utils/Canvas.js'

  const width = document.body.clientWidth
  const height = document.body.clientHeight
  const stars = new Array(100)
  const words = [
    {
      tag: 'NORMAL',
      pos: [getRandomNumFromRange(0, width), getRandomNumFromRange(0, height)],
      name: 'test'
    },
    {
      tag: 'NORMAL',
      pos: [getRandomNumFromRange(0, width), getRandomNumFromRange(0, height)],
      name: 'hello'
    }
  ]

  let canvas

  onMount(async () => {
    await tick()

    setInterval(() => {

    }, 1000)

    for (let i = 0, len = stars.length; i < len; ++i) {
      stars[i] = [
        getRandomNumFromRange(0, width),
        getRandomNumFromRange(0, height)
      ]
    }

    const loop = () => {
      paintAll('black')(canvas)
      renderStars(stars)(canvas)

      for (let i = 0, len = stars.length; i < len; ++i) {
        stars[i][0] += 1

        if (stars[i][0] > width) {
          stars[i][0] = 0
        }
      }

      words.forEach(word => {
        renderWord(word)(canvas)
        word.pos[0] += 1
      })

      window.requestAnimationFrame(loop)
    }

    loop()
  })

</script>

<style>
  section {
    min-height: 100vh;
  }

  h1 {
    font-style: italic;
  }

  p {
    transform: translateX(5px);
    margin-top: 2px;
    font-size: 24px;
  }

  .t {
    margin: 0;
    font-size: 90;
    letter-spacing: .10em;
    text-shadow: 2px 2px 1px #ff00ff;
    color: #ff0a3b;
  }

  #title-caret {
    position: absolute;
    transform: translate(-10px, 10px);
  }

  #info {
    position: absolute;
    bottom: 0;
    left: 30px;
  }
</style>

<section in:fade='{{ duration: 100 }}'>
  <canvas width={width} height={height} bind:this={canvas}></canvas>
  <div id='info'>
    <h1 class='t'>fastyper<span class='blink'>_</span></h1>
    <p>An online-based typing speed-test game.</p>
  </div>
</section>
