<script>
  import { fade } from 'svelte/transition'
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50px;
    background-color: #0A0A0A;
  }
  nav>* {
    display: table-cell;
    vertical-align: middle;
  }

  h2 {
    display: table-cell;
    vertical-align: middle;
    color: red;
    text-shadow: 1px 1px 1px #ff00ff;
    font-size: 2em;
    font-style: italic;
    letter-spacing: .05em;
  }

  #nav-buttons {
    float: right;
  }
</style>

<nav transition:fade='{{ duration: 80 }}'>
  <h2>f_</h2>
  <div id='nav-buttons'>
    <button>Log-in</button>
  </div>
</nav>
