<script>
  import Typewriter from 'svelte-typewriter'

</script>

<style>
  div {
    height: 100%;
  }

  #intro {
    margin: 0 auto;
    display: block;
    box-sizing: border-box;
    width: 75%;
    margin-top: 10vh;
    margin-bottom: 50px;
    text-align: center;
  }

  h1 {
    margin: 0 auto;
    font-size: 8vw;
    font-weight: normal;
    font-family: 'VT323';
    color: lime;
    letter-spacing: .10em;
    text-shadow: 0px 0px 10px;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    animation: animated-text 2s steps(25,end) 0.1s 1 normal both;
  }

  p {
    font-size: 20px;
  }

  #about-1 {
    background-color: #191919;
  }
</style>

<div>
  <div id='intro'>
    <h1>fastyper</h1>
    <p>Typing has never been this fun.</p>
    <button>Play</button>
    <button>Rankings</button>
  </div>
  <div id='about-1'>
    This is another div.
  </div>
</div>
