<script>
  import { fetchUserWithUsername } from '../utils/fetcher.js'
  import { getRed, getYellow, getBlue } from '../utils/colors.js'
  import { onMount } from 'svelte'
  
  export let params

  let user

  const getLevelColor = level => {
    switch (level) {
      case 'Professional':
        return getYellow()
        break
      case 'Beginner':
        return getBlue()
        break
      case 'Godlike':
        return getRed()
        break
    }
  }

  onMount(async () => {
    user = await fetchUserWithUsername(params.username)
  })
</script>

<style>
  #card {
    padding: 25px;
    font-size: 1.7em;
    margin: 0 auto;
    margin-top: 100px;
    width: 70vw;
    max-width: 700px;
    height: 185px;
    background-color: #262729;
    margin-bottom: 10px;
    border: 2px solid #2405F2;
  }

  #profile-pic {
    background-color: white;
    display: block;
    width: 75px;
    height: 75px;
  }

  #user-level {
    display: block;
    font-size: 0.7em;
    color: #FFFF07;
  }

  #stats {
    margin: 0 auto;
    width: 90%;
    max-width: 1000px;
    height: 500px;
    background-color: #262729;
  }

  ul {
    list-style-type: none;
    background-color: #3C3D3F;
  }

  li {
    display: inline-block;
    font-size: 1.3em;
    margin-right: 10px;
  }

  @media screen and (max-width: 480px) {
    #card {
      text-align: center;
    }
    #profile-pic {
      margin: 0 auto;
    }

    #stats {
    }
  }
</style>

<div id='card'>
  <div id='profile-pic'></div>
  <span id='user-username'>{user?.username}</span>
  <span id='user-level' style='color: {getLevelColor(user?.level)}'>{user?.level}</span>
</div>
<div id='stats'>
  <ul>
    <li>Stats</li>
    <li>History</li>
  </ul>
</div>
