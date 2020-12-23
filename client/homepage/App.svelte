<script>
  import Router, { location } from 'svelte-spa-router'
  import Home from './routes/Home.svelte'
  import Play from './routes/Play.svelte'
  import Navbar from './components/Navbar.svelte'
  import { onMount } from 'svelte'

  let atTopOfPage = true

  const routes = {
    '/': Home,
    '/play': Play
  }

  onMount(() => {
    window.addEventListener('scroll', () => {
      atTopOfPage = document.body.scrollTop === 0
    })
  })
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

  :global(html, body) {
    margin: 0;
    background-color: #0A0A0A;
    color: white;
    font-family: 'VT323';
  }

  :global(.caret) {
    border-bottom: solid 3px rgba(0,255,0,.75);
    position: absolute;
    right: -7px;
    width: 20px;
    animation: animated-cursor 600ms steps(30, end) infinite;
  }

  :global(button) {
    font-family: inherit;
    outline: none;
    border: 0;
    padding: 10px;
    color: black;
    font-size: 1.1em;
    background-color: white;
  }

  @keyframes -global-animated-text {
    from{width: 0;}
    to{width: 100%;}
  }

  @keyframes -global-animated-cursor {
    from{border-bottom-color: rgba(0,255,0,.75);}
    to{border-bottom-color: transparent;}
  }
</style>

{#if !atTopOfPage || $location !== '/'}
  <Navbar />
{/if}
<Router {routes} />
