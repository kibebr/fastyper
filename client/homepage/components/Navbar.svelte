<script>
  import { fade } from 'svelte/transition'
  import { push, location } from 'svelte-spa-router'
  import LoginModal from './LoginModal.svelte'

  let isLoginModalOpen = false
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    z-index: 1;
    padding-left: 20px;
    width: 100%;
    height: 45px;
    background-color: #0A0A0A;
  }

  #nav-title {
    display: inline-block;
    color: #ff0a3b;
    text-shadow: 1px 1px 1px #ff00ff;
    font-size: 2em;
    font-style: italic;
    letter-spacing: .05em;
    vertical-align: middle;
    cursor: pointer;
  }

  #nav-buttons {
    float: right;
    padding-right: 40px;
  }

  #nav-caret {
    position: absolute;
    transform: translateY(1px);
  }

  #close-loginmodal-btn {
    background-color: red;
    color: white;
    padding: 3px;
    width: 20px;
    min-width: 0;
  }

  #nav-play-btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff0a3b;
    color: white;
  }

  button {
    min-width: 40px;
    margin-top: 10px;
    padding: 3px;
  }
</style>

<nav transition:fade='{{ duration: 80 }}'>
  <span id='nav-title' on:click={() => push('/')}>
    f<span id='nav-caret' class='blink'>_</span>
  </span>
    <button id='nav-play-btn' on:click={() => push('/play')}>Play</button>
  <div id='nav-buttons'>
    {#if !isLoginModalOpen}
      <button on:click={() => isLoginModalOpen = true}>Log-in</button>
    {:else}
      <button id='close-loginmodal-btn' on:click={() => isLoginModalOpen = false}>X</button>
    {/if}
  </div>
</nav>
{#if isLoginModalOpen}
  <LoginModal onClose={() => isLoginModalOpen = false} />
{/if}
