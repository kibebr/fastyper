<script>
  import { push } from 'svelte-spa-router'
  import { slide } from 'svelte/transition'
  import { getRandomNumFromRange } from '../../common/getRandomNumFromRange.js'
  import { onMount, tick } from 'svelte'
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

    await tick()

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
    
    loop()
  })

</script>

<style>
</style>

<section transition:slide='{{ duration: 150 }}' class='p-5 md:px-10 md:py-14'>
  <div>
    <h1 class='text-6xl'>Select a word list</h1>
  </div>
  {#if wordNodes}
    <div class='flex flex-row flex-wrap flex-shrink-0 gap-5'>
      {#each wordNodes as wordNode}
        <button in:slide='{{ duration: 300 }}' on:click={() => push(`/play/${wordNode.id}`)} class='w-80 h-80 outline-white'>
          <div>
            {#each wordNode.words as word}
              <span class='word' style='left: {getRandomNumFromRange(0, 300)}; top: {getRandomNumFromRange(0, 280)}'>
                {word}
              </span>
            {/each}
          </div>
          <span style='color: {getDifficultyColor(wordNode.difficulty)}'>
            {wordNode.difficulty.toUpperCase()}
          </span>
          <div class='bg-gray-900'>
            <h2>{wordNode.title}</h2>
            <span>Times played: 0</span>
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <div>Loading...</div>
  {/if}
</section>
