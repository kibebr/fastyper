<script>
  import { onMount, tick } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { fade } from 'svelte/transition'
  import { fetchHomepageWordList } from '../services/WordService.js'
  import { getRandomNumFromRange } from '../../common/getRandomNumFromRange.js'
  import { createWordObj } from '../../common/createWordObj.js'

</script>

<section in:fade='{{ duration: 100 }}' class='p-5 text-center md:text-left md:p-10'>
  <div class='h-full border-b-2 border-white border-dotted'>
    <h1 class='text-6xl tracking-tight md:text-8xl text-logo-pink logo-text-shadow'>fastyper<span class='blink'>_</span></h1>
    <p class='text-2xl md:text-3xl'>Community-based typing speed test game.</p>
    <div class='flex flex-row flex-wrap flex-shrink-0 mt-5 bg-black justify-evenly'>
      <div class='text-center'>
        <div class='w-48 h-32 bg-red-200'>
        </div>
        <h3 class='text-2xl' on:click={() => push('/auth')}>
          Fun, easy
        </h3>
      </div>
      <div class='text-center'>
        <div class='w-48 h-32 bg-red-200'>
        </div>
        <h3 class='text-2xl'>
          Community-based
        </h3>
      </div>
      <div class='text-center'>
        <div class='w-48 h-32 bg-red-200'>
        </div>
        <h3 class='text-2xl'>
          Ranking system
        </h3>
      </div>
    </div>
  </div>
</section>

<section class='h-screen p-5 md:p-10'>
  <h2 class='text-5xl'>
    >>>> coming soon to...
  </h2>
</section>
