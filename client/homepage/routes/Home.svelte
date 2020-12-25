<script>
  import { push } from 'svelte-spa-router'
</script>

<style>
  section {
    height: 100%;
  }

  #intro {
    display: block;
    box-sizing: border-box;
    margin-top: 10vh;
    text-align: center;
    margin-bottom: 50px;
    height: 70%;
  }

  h1 {
    font-style: italic;
    font-size: 20vmin;
    font-weight: normal;
    font-family: 'VT323';
    letter-spacing: .10em;
    text-shadow: 0.3vw 0.5vh 1px #ff00ff;
    color: red;
  }

  p {
    font-size: 2.3vmax;
  }

  button {
    padding: 1vmax;
    width: 10vw;
  }

  #about-1 {
    background-color: #191919;
  }

  #title-caret {
    position: absolute;
    transform: translate(-10px, 10px);
  }

  @media screen and (max-width: 650px) {
    h1 {
      font-size: 22vw;
    }

    #title-caret {
      display: none;
    }

    p {
      font-size: 6vw;  
    }
  }

</style>

<div>
  <section id='intro'>
    <h1>fastyper<span id='title-caret' class='blink'>_</span></h1>
    <p>A community-focused typing speed test game.</p>
    <button on:click={() => push('/play')}>Play</button>
  </section>
  <section id='about-1'>
    <p>This is another section.</p>
  </section>
</div>
