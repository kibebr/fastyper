<script>
  import Router from 'svelte-spa-router'
  import Home from './routes/Home.svelte'

  const routes = {
    '/': Home
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

  :global(html, body) {
    margin: 0;
    background-color: black;
    color: white;
  }

  :global(.caret) {
    border-bottom: solid 3px rgba(0,255,0,.75);
    position: absolute;
    right: -7px;
    width: 20px;
    animation: animated-cursor 600ms steps(30, end) infinite;
  }

  :global(button) {
    outline: none;
    border: 0;
    padding: 8px;
    background-color: #ffff00;
    color: black;
    font-size: 1.1em;
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

<Router {routes} />
