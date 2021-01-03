<script>
  import { push } from 'svelte-spa-router'
  import { slide } from 'svelte/transition'
  import { getRandomNumFromRange } from '../../game/utils.js'
  import { onMount } from 'svelte'
    
  const wordsList = [
    {
      id: '19',
      difficulty: 'easy',
      title: 'English 1',
      preview: ['banana', 'test', 'coco', 'brand', 'new', 'man', 'i', 'saw', 'the', 'light', 'baptized']
    },
    {
      id: '20',
      difficulty: 'hard',
      title: 'English 2',
      preview: ['english', 'math', 'science', 'flow', 'pipe', 'coco', 'xixi', 'ground', 'skatepark', 'skate']
    }
  ]

  const getDifficultyColor = diff => {
    switch (diff) {
      case 'easy':
        return '#00ff80'
      case 'hard':
        return '#ff0a3b'
    }
  }

  onMount(() => {
    const words = document.querySelectorAll('.word')

    const loop = () => {
      words.forEach(word => {
        const newLeft = parseFloat(word.style.left) + 0.3

        word.style.left = `${newLeft}px`

        if (newLeft >= 400) {
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
    height: 500px;
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
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }

  .words-card {
    display: inline-block;
    position: relative;
    width: 400px;
    height: 500px;
    color: white;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid white !important;
  }

  .words-card:hover {
    transform: scale(1.01);
  }

  .words-title {
    font-weight: normal;
  }

  .words-difficulty {
    position: absolute;
    top: 0;
    right: 10px;
    color: #00ff80;
    font-size: 24px;
    padding: 5px;
  }

  .words-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: white;
    color: black;
    padding-top: 5px;
    padding-left: 15px;
  }

  .word {
    font-size: 16px;
    position: absolute;
    left: 0;
  }
</style>

<section transition:slide='{{ duration: 150 }}'>
  <h1>/words</h1>

  <div id='word-list'>
    {#each wordsList as wordList}
      <div class='words-card' on:click={() => push(`/play/${wordList.id}`)}>
        <div class='words-background'>
          {#each wordList.preview as word}
            <span class='word' style='left: {getRandomNumFromRange(0, 400)}; top: {getRandomNumFromRange(0, 400)}'>
              {word}
            </span>
          {/each}
        </div>
        <span class='words-difficulty' style='color: {getDifficultyColor(wordList.difficulty)}'>
          {wordList.difficulty.toUpperCase()}
        </span>
        <div class='words-info' >
          <h2 class='words-title'>{wordList.title}</h2>
        </div>
      </div>
    {/each}
  </div>
</section>
