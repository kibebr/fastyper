<script>
  import { onMount, tick } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { fade } from 'svelte/transition'
  import { renderStars, renderWord, paintAll } from '../utils/Canvas.js'
  import { fetchHomepageWordList } from '../services/WordService.js'
  import { getRandomNumFromRange } from '../../common/getRandomNumFromRange.js'
  import { createWordObj } from '../../common/createWordObj.js'

  const width = document.body.clientWidth
  const height = document.body.clientHeight
  const stars = new Array(200)
  const wordObjCreator = createWordObj([width, height])(() => 1)

  let canvas
  let words

  onMount(async () => {
    words = await fetchHomepageWordList()
    words = words.split('\n').map(wordObjCreator)

    await tick()

    setInterval(() => {
      const lastIndex = words.length - 1
      words.splice(-1, 1)
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

      stars.forEach(star => {
        star[0] += 0.5
        if (star[0] > width) {
          star[0] = 0
        }
      })

      for (let len = words.length - 1, i = len; i > len - 20; --i) {
        renderWord(words[i])(canvas)
        words[i].pos[0] += 0.5
      }

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
    font-size: clamp(40px, 80px, 120px);
    font-weight: normal;
  }

  p {
    transform: translateX(5px);
    margin-top: 2px;
    font-size: clamp(15px, 4.8vw, 25px);
    color: black;
  }

  .t {
    margin: 0;
    letter-spacing: .10em;
    /* text-shadow: 2px 2px 1px grey; */
    color: black;
  }

  #title-caret {
    position: absolute;
    transform: translate(-10px, 10px);
  }

  #info {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 30px;
    padding: 25px;
    background-color: white;
  }

</style>

<section in:fade='{{ duration: 100 }}'>
  <canvas width={width} height={height} bind:this={canvas}></canvas>
  <div id='info'>
    <h1 class='t'>fastyper<span class='blink'>_</span></h1>
    <p>An online-based typing speed-test game.</p>
  </div>
</section>
