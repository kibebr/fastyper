<script>
  import { fade } from 'svelte/transition'
  import { login } from '../services/UserService.js'
  import { message } from '../stores/Alert.js'

  let lUsername
  let lPassword

  const onAuth = async () => {
    const result = await login('test', 'test')
    if (result.status === 403) {
      message.addAlert('success', 'Incorrect username or password.')
    }
  }
</script>

<section in:fade='{{ duration: 100 }}' class='flex items-center justify-center w-full h-full p-5 text-center md:px-10 md:py-14'>
  <div class='flex flex-col items-center p-10 bg-gray-900'>
    <h1 class='mb-5 text-3xl md:text-5xl'>Log-in to Fastyper</h1>
    <div>
      <form class='flex flex-col items-start' on:submit|preventDefault={onAuth}>
        <input bind:value={lUsername} class='p-1 px-2 mb-5 text-lg bg-black border-2 border-white w-36' placeholder='Username' />
        <input bind:value={lPassword} type='password' class='p-1 px-2 text-xl bg-black border-2 border-white w-36' placeholder='Password' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  </div>
</section>
