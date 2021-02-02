<script>
  import { push } from 'svelte-spa-router'
  import { slide } from 'svelte/transition'
  import { getRandomNumFromRange } from '../../utils.js'
  import { onMount } from 'svelte'
  import { fetchWordNodes } from '../services/WordService.js'

  let filter = ''
  let wordNodes = null
  let errorMessage = undefined

  const getDifficultyColor = diff => {
    switch (diff) {
      case 'easy':
        return '#00ff80'
      case 'hard':
        return '#ff0a3b'
    }
  }

  onMount(async () => {
    wordNodes = await fetchWordNodes()
    const movingWords = document.querySelectorAll('.word')

    const loop = () => {
      movingWords.forEach(word => {
        const newLeft = parseFloat(word.style.left) + 0.3

        word.style.left = `${newLeft}px`

        if (newLeft >= 400) {
          word.style.left = '-50px'
        }
      })  

      window.requestAnimationFrame(loop)
    }
  })

</script>

<style>
  section {
    height: 500px;
  }

  h1 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 3em;
  }

  #word-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    padding: 20px;
  }

  .words-card {
    display: inline-block;
    position: relative;
    width: 400px;
    height: 500px;
    color: white;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
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
    right: 0;
    color: #00ff80;
    font-size: 24px;
    padding: 5px;
  }

  .words-info {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.5);
    padding-left: 15px;
  }

  .words-info>h2 {
    font-size: 32px;
    margin: 0;
  }

  .words-info>span {
    font-size: 16px;
  }

  .word {
    font-size: 16px;
    position: absolute;
    left: 0;
  }

  #intro {
    text-align: center;
    width: 100%;
    height: 130px;
    margin-bottom: 30px;
    border-bottom: 1px solid #232323;
  }

  input {
    border: 2px solid #232323;
    font-size: 1.2em;
    height: 30px;
    padding-left: 5px;
  }
</style>

<section transition:slide='{{ duration: 150 }}'>
  <div id='intro'>
    <h1>/words</h1>
    <input placeholder='Search...' bind:value={filter} />
  </div>
  {#if wordNodes}
    <div id='word-list'>
      {#each wordNodes as wordNode}
        <div class='words-card' in:slide='{{ duration: 300 }}' on:click={() => push(`/play/${wordNode.id}`)} style='visibility: visible'>
          <div class='words-background'>
            {#each wordNode.words as word}
              <span class='word' style='left: {getRandomNumFromRange(0, 400)}; top: {getRandomNumFromRange(0, 480)}'>
                {word}
              </span>
            {/each}
          </div>
          <span class='words-difficulty' style='color: {getDifficultyColor(wordNode.difficulty)}'>
            {wordNode.difficulty.toUpperCase()}
          </span>
          <div class='words-info'>
            <h2 class='words-title'>{wordNode.title}</h2>
            <span>Times played: 0</span>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div>Loading...</div>
  {/if}
</section>
