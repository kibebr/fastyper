<script>
  import Router from 'svelte-spa-router'
  import { fade } from 'svelte/transition'
  import { wrap } from 'svelte-spa-router/wrap'
  import { location } from 'svelte-spa-router'
  import Message from './components/Message.svelte'
  import Home from './routes/Home.svelte'
  import Profile from './routes/Profile.svelte'
  import Words from './routes/Words.svelte'
  import Auth from './routes/Auth.svelte'
  import Navbar from './components/Navbar.svelte'
  import MobileNavbar from './components/MobileNavbar.svelte'
  import MediaQuery from 'svelte-media-query'
  import { message } from './stores/Alert.js'

  const routes = {
    '/': Home,
    '/user/:username': Profile,
    '/play': Words,
    '/auth': Auth,
    '/play/:id': wrap({
      asyncComponent: () => import('./routes/Play.svelte')
    }) 
  }

  $: console.log($message)
</script>

<style global>
  :global(html, body) {
    font-family: 'VT323';
  }

  :global(.blink) {
    animation: blink-anim 0.9s steps(2, start) infinite;
  }

  :global(.logo-text-shadow) {
    text-shadow: 0.3vw 0.5vh 1px #ff00ff;
  }

  @keyframes -global-blink-anim {
    to {
      visibility: hidden;
    }
  }
</style>

<Navbar />
<Router {routes} />
{#if $message}
  <div transition:fade='{{ duration: 100 }}' class='fixed bottom-5 inset-center-x'>
    <Message type={$message.type} content={$message.content} />
  </div>
{/if}
