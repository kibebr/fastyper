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
    -webkit-font-smoothing: antialiased;
  }

  :global(button) {
    font-family: inherit;
    outline: none;
    border: 0;
    padding: 10px;
    color: black;
    font-size: 1.1em;
    background-color: white;
    cursor: pointer;
  }

  :global(.blink) {
    animation: blink-anim 0.9s steps(2, start) infinite;
  }

  @keyframes -global-animated-text {
    from{width: 0;}
    to{width: 100%;}
  }

  @keyframes -global-blink-anim {
    to { visibility: hidden }
  }
</style>

{#if !atTopOfPage || $location !== '/'}
  <Navbar />
{/if}
<Router {routes} />
