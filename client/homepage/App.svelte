<script>
  import Router, { location } from 'svelte-spa-router'
  import { wrap } from 'svelte-spa-router/wrap'
  import Home from './routes/Home.svelte'
  import Profile from './routes/Profile.svelte'
  import Navbar from './components/Navbar.svelte'
  import { onMount } from 'svelte'

  let atTopOfPage = true

  const routes = {
    '/': Home,
    '/play': wrap({
      asyncComponent: () => import('./routes/Play.svelte')
    }),
    '/profile/:username': Profile
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
    -moz-osx-font-smoothing: grayscale;
  }

  :global(button) {
    position: relative;
    padding: 10px;
    color: black;
    font-size: 1.1em;
    background-color: white;
    cursor: pointer;
  }

  :global(button:active) {
    top: 2px;
  }

  :global(button, input) {
    font-family: inherit;
    outline: none;
    border: 0;
  }

  :global(.blink) {
    animation: blink-anim 0.9s steps(2, start) infinite;
  }

  :global(::selection) {
    color: black;
    background-color: yellow;
  }

  @keyframes -global-blink-anim {
    to { visibility: hidden }
  }
</style>

{#if !atTopOfPage || $location !== '/'}
  <Navbar />
{/if}
<Router {routes} />
