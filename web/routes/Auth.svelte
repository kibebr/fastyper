<script>
  import { fade } from 'svelte/transition'
</script>

<section in:fade='{{ duration: 100 }}' class='flex flex-col items-center justify-center w-full h-full p-5 text-center md:px-10 md:py-14'>
  <h1 class='mb-5 text-3xl md:text-7xl'>Log-in to Fastyper</h1>
  <div>
    <form class='flex flex-col items-start'>
      <input class='p-1 px-2 mb-5 text-lg bg-black border-2 border-white w-36' placeholder='Username' />
      <input type='password' class='p-1 px-2 text-xl bg-black border-2 border-white w-36' placeholder='Password' />
      <button>>Submit</button>
    </form>
  </div>
</section>
