<script>
  import { fade } from 'svelte/transition'
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
    vertical-align: middle;
  }

  #nav-title {
    display: inline-block;
    color: red;
    text-shadow: 1px 1px 1px #ff00ff;
    font-size: 2em;
    font-style: italic;
    letter-spacing: .05em;
    vertical-align: middle;
  }

  #nav-buttons {
    float: right;
    display: inline-block;
    padding-right: 40px;
  }

  button {
    margin-top: 10px;
    padding: 3px;
  }
</style>

<nav transition:fade='{{ duration: 80 }}'>
  <span id='nav-title'>f<span class='blink'>_</span></span>
  <div id='nav-buttons'>
    <button>Log-in</button>
  </div>
</nav>
