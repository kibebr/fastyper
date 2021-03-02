<script>
  import { slide, fade } from 'svelte/transition'
  import { push, location } from 'svelte-spa-router'
  import { session } from '../stores/Session.js'

  let showTitle = false

  document.addEventListener('scroll', () => {
    showTitle = document.documentElement.scrollTop >= 200
  })
</script>

<style>
  .text-shadow {
    text-shadow: 1px 1px 1px #ff00ff;
  }
</style>

<nav class='fixed flex flex-row items-center justify-between w-full px-10 bg-transparent h-14'>
  <div>
    {#if $location === '/' ? showTitle : true}
      <a href='#/' transition:fade='{{ duration: 1000 }}'>
        <h2 class='text-3xl italic tracking-tight text-logo-pink text-shadow'>fastyper<span class='blink'>_</span></h2>
      </a>
    {/if}
  </div>

  <div>
    {#if $location !== '/play'}
      <a href='#/play' class='mr-2 text-xl text-blue-400 border-b border-blue-400 hover:text-blue-500 hover:border-blue-500'>
        Play
      </a>
    {/if}
    {#if $location !== '/auth' && !$session}
      <a href='#/auth' class='text-xl text-blue-400 border-b border-blue-400 hover:text-blue-500 hover:border-blue-500'>
        Log-in
      </a>
    {/if}
    {#if $session}
      <a href='#/' class='text-xl'>{$session.username}</a>
    {/if}
  </div>
</nav>
