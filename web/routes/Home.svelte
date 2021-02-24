<script>
  import Button from '../components/Button.svelte'
  import { onMount, tick } from 'svelte'
  import { push } from 'svelte-spa-router'
  import { fade } from 'svelte/transition'
  import { fetchHomepageWordList } from '../services/WordService.js'
  import { getRandomNumFromRange } from '../../common/getRandomNumFromRange.js'
  import { createWordObj } from '../../common/createWordObj.js'
</script>

<section in:fade='{{ duration: 100 }}' class='p-5 text-center md:p-10'>
  <div class='flex flex-col items-center justify-center border-b-2 border-white border-dotted h-96'>
    <h1 class='tracking-tight text-8xl md:text-9xl text-logo-pink logo-text-shadow'>fastyper<span class='blink'>_</span></h1>
    <p class='my-5 text-2xl md:text-3xl'>Community-based typing speed test game.</p>
    <div>
      <Button>
        Play
      </Button>
    </div>
  </div>
</section>

<section class='h-screen p-5 md:p-10'>
  <h2 class='text-5xl shadow-2xl text-flamingo-500'>
    >>>> Fun
  </h2>
</section>
