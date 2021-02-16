<script>
  import { slide } from 'svelte/transition'
  import { push, location } from 'svelte-spa-router'
  import LoginModal from './LoginModal.svelte'

  let isLoginModalOpen = false
</script>

<style>
  nav {
    position: fixed;
    display: flex;
    width: 100%;
    padding: 20px;
  }

  #nav-left {
    flex: 1;
    display: flex;
    justify-content: flex-start;
  }

  #nav-center {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  #nav-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  span {
    font-size: 24px;
  }
</style>

<nav>
  <div id='nav-left'>
    a
  </div>

  <div id='nav-center'>
  </div>

  <div id='nav-right'>
    <span>Log-in</span>
  </div>
</nav>
