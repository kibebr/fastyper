<script>
  import { slide } from 'svelte/transition'
  import { getRandomNumFromRange } from '../../game/utils.js'
  import { onMount } from 'svelte'
    
  const wordsList = [
    {
      title: 'English 1',
      preview: ['banana', 'test', 'coco']
    },
    {
      title: 'English 2',
      preview: ['english', 'math', 'science', 'flow', 'pipe', 'coco', 'xixi', 'ground', 'skatepark', 'skate']
    }
  ]


  onMount(() => {
    const words = document.querySelectorAll('.word')

    const loop = () => {
      words.forEach(word => {
        word.style.left = `${parseInt(word.style.left) + 1}px`

        if (word.style.left === '300px') {
          word.style.left = '-50px'
        }
      })  
      window.requestAnimationFrame(loop)
    }

    loop()
  })
</script>

<style>
  section {
    padding-top: 50px;
    padding-left: 50px;
    height: 100%;
  }

  h1 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 3em;
    color: magenta;
    text-shadow: 2px 2px 1px red;
  }

  #word-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .words-card {
    display: inline-block;
    position: relative;
    width: 300px;
    height: 200px;
    color: white;
    border: 2px solid #00ff80;
    cursor: pointer;
    overflow: hidden;
  }

  .words-card:hover {
    transform: scale(1.05);
  }

  .words-title {
    font-size: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .words-background {
    opacity: 0.9;
  }

  .word {
    font-size: 14px;
    position: absolute;
    left: 0;
  }
</style>

<section transition:slide='{{ duration: 100 }}'>
  <h1>/words</h1>

  <div id='word-list'>
    {#each wordsList as wordList}
      <div class='words-card'>
        <div class='words-background'>
          {#each wordList.preview as word}
            <span class='word' style='left: {getRandomNumFromRange(0, 300)}; top: {getRandomNumFromRange(0, 200)}'>
              {word}
            </span>
          {/each}
        </div>
        <span class='words-title'>
          {wordList.title}
        </span>
      </div>
    {/each}
  </div>
</section>
