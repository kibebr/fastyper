<script>
  import { slide } from 'svelte/transition'
  import { push, location } from 'svelte-spa-router'
  import LoginModal from './LoginModal.svelte'

  let isLoginModalOpen = false
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 50px;
    z-index: 1;
    background-color: #0A0A0A;
  }

  #nav-title {
    left: 20px;
    color: #00ff80;
    font-size: 2em;
    font-style: italic;
    letter-spacing: .05em;
    vertical-align: middle;
    cursor: pointer;
  }

  #nav-caret {
    position: absolute;
    transform: translateY(1px);
  }

  .nav-square {
    position: relative;
    width: 100%;
    height: 50px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .nav-square:hover {
    background-color: #FF0A3B;
  }

  .nav-el {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .nav-icon {
    width: 32px;
    height: 32px;
    fill: #00ff80;
  }

  #nav-play-btn {
    width: 32px;
    height: 32px;
  }

  #nav-user-btn {
    width: 24px;
    height: 24px;
  }
</style>

<nav>
  {#if $location !== '/'}
    <div id='nav-logo-wrapper' class='nav-square' transition:slide='{{ duration: 80 }}' on:click={() => push('/')}>
      <span id='nav-title' class='nav-el'>f<span id='nav-caret' class='blink'>_</span></span>
    </div>
  {/if}

  <div class='nav-square' on:click={() => push('/play')}>
    <svg xmlns="http://www.w3.org/2000/svg" id='nav-play-btn' class="nav-el nav-icon" viewBox="0 0 16 16">
      <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
    </svg>
  </div>

  <div id='nav-user-square' class='nav-square'>
    <svg xmlns="http://www.w3.org/2000/svg" id='nav-user-btn' class="nav-el nav-icon" viewBox="0 0 16 16">
      <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
      <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
    </svg>
  </div>
</nav>
