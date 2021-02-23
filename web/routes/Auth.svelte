<script>
  import { fade } from 'svelte/transition'
</script>

<section in:fade='{{ duration: 100 }}' class='p-5 text-center md:px-10 md:py-14 md:text-left'>
  <h1 class='text-3xl md:text-5xl'>Log-in</h1>
  <div>
    <form class='flex flex-col items-start'>
      <input class='w-24 p-1 px-2 mb-5 text-lg bg-black border-2 border-white' placeholder='Username' />
      <input type='password' class='w-24 p-1 px-2 text-xl bg-black border-2 border-white' placeholder='Password' />
      <button>Submit</button>
    </form>
  </div>
</section>
