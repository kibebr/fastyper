<script>
  import Modal from './Modal.svelte'

  export let onClose
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

  ::placeholder {
    color: white;
  }
</style>

<Modal>
  <div class='content'>
    <h2>Log-in</h2>
    <form>
      <input placeholder='Username' />
      <input placeholder='Password' type='password' />
      <button>Log-in!</button>
    </form>
  </div>
</Modal>
