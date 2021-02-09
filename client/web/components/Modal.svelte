<script>
  import { fade } from 'svelte/transition'
</script>

<style>
  .modaloverlay {
    background-color: rgba(0, 0, 0, 0.7);
    bottom:0;
    left:0;
    position:fixed;
    right:0;
    top:0; 
    color: white;
    overflow: hidden;
  }

  .modal {
    background-color: black;
    height: 75%;
    position: relative;
    margin: 5% auto;
    max-height: 57em;
    max-width: 66em;
    width: 60%;
    -webkit-overflow-scrolling: touch;
    margin: 0 auto;
    overflow: hidden;
  }

  @media screen and (max-width: 480px) {
    .modal {
      height: 100%;
      margin: 0 auto;
      width: 100%;
    }
  }
</style>

<div transition:fade='{{ duration: 80 }}' class='modaloverlay'>
  <div class='modal'>
    <slot />
  </div>
</div>
