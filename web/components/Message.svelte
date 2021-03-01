<script>
  import Cross from '../assets/icons/red_cross.svg'
  import Mark from '../assets/icons/check_mark.svg'

  export let bg
  export let fg
  export let type
  export let content
</script>

<style>
  :global(svg) {
    width: 24px;
    height: 24px;
    margin-right: 0.5rem;
  }
</style>

<div class='flex flex-row items-center p-2 text-xl text-black bg-white'>
  {#if type === 'success'}
    {@html Mark}
  {:else}
    {@html Cross}
  {/if}
  Incorrect username or password.
</div>
