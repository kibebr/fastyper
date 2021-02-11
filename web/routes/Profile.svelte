<script>
  import { fetchUserWithUsername } from '../utils/fetcher.js'
  import { getRed, getYellow, getBlue } from '../utils/colors.js'
  import { onMount } from 'svelte'
  
  export let params

  let user

  onMount(async () => {
    user = await fetchUserWithUsername(params.username)
    console.log(user)
  })
</script>

<style>
  #view {
    padding: 100px;
  }

  #profile-pic {
    width: 96;
    height: 96px;
  }
</style>

<div id='view'>
{#if user}
  <img id='profile-pic' src='https://64.media.tumblr.com/8ca62aff8a2cb56feaf63787c6ca8afd/76524233fb8ad8a0-45/s250x400/6b38489b017eae385c5f26ef03fbb013f7000877.png' alt='Profile pic' />
  {user.username}
{/if}
</div>
