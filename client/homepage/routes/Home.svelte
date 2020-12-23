<script>
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

</style>

<div>
  <section id='intro'>
    <h1>fastyper<span id='title-caret' class='blink'>_</span></h1>
    <p>A community-based typing game.</p>
    <button>Play</button>
  </section>
  <section id='about-1'>
    This is another div.
  </section>
</div>
