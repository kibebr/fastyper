<script>
  import Modal from './Modal.svelte'

  export let onClose

  let isRegistering = false
</script>

<style>
  h2 {
    text-align: center;
    font-size: 56px;
    font-weight: normal;
  }

  form {
    text-align: center;
  }

  input {
    margin: 0 auto;
    font-size: 1.5em;
    padding: 10px;
    display: block;
    background-color: #0A0A0A;
    color: white;
    margin-bottom: 20px;
  }

  .content {
    padding: 15px;
    margin: 0 auto;
    text-align: center;
  }

  .option {
    color: skyblue;
    cursor: pointer;
    font-size: 20px;
  }

  .option:hover {
    text-decoration: underline;
  }

  ::placeholder {
    color: white;
  }
</style>

<Modal>
  <div class='content'>
    {#if !isRegistering}
      <h2>Log-in</h2>
      <form>
        <input placeholder='Username' />
        <input placeholder='Password' type='password' />
        <button>Log-in</button>
      </form>
      <span on:click={() => isRegistering = true} class='option'>I want to create an account instead</span>
    {:else}
      <h2>Create an account</h2>
      <form>
        <input placeholder='Username' />
        <input placeholder='E-mail' type='email' />
        <input placeholder='Password' type='password' />
        <button>Register</button>
      </form>
      <span on:click={() => isRegistering = false} class='option'>I want to log-in instead</span>
    {/if}
  </div>
</Modal>
