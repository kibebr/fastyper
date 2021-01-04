<script>
  import Router from 'svelte-spa-router'
  import { wrap } from 'svelte-spa-router/wrap'
  import Home from './routes/Home.svelte'
  import Profile from './routes/Profile.svelte'
  import Words from './routes/Words.svelte'
  import Navbar from './components/Navbar.svelte'
  import MobileNavbar from './components/MobileNavbar.svelte'
  import MediaQuery from 'svelte-media-query'

  const routes = {
    '/': Home,
    '/profile/:username': Profile,
    '/play': Words,
    '/play/:id': wrap({
      asyncComponent: () => import('./routes/Play.svelte')
    }) 
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

  :global(html, body) {
    margin: 0;
    margin-left: 25px;
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

  :global(h1) {
    font-weight: normal;
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

  @media screen and (max-width: 500px) {
    :global(html, body) {
      margin-left: 0px !important;
    }
  }
</style>

<MediaQuery query='(max-width: 500px)' let:matches>
  {#if matches}
    <MobileNavbar />
  {:else}
    <Navbar />
  {/if}
</MediaQuery>
<Router {routes} />
