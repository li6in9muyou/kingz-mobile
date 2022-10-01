<script lang="ts">
  import LocalIdentity from "../useCase/LocalIdentity";

  export let use_case: LocalIdentity;
</script>

<main>
  <h1>To start new Game, enter a nickname</h1>
  <input id="nickname" type="text" />
  <button
    on:click={() => {
      use_case.on_register(document.getElementById("nickname").value);
    }}
  >
    submit
  </button>
</main>

<style>
  * {
    color: whitesmoke;
    background: black;
  }

  h1 {
    animation: float 2s ease-in-out infinite;
  }

  input {
    font-size: 3rem;
    background: whitesmoke;
    color: black;
  }

  button {
    border-radius: 1rem;
    background: lightcoral;
    padding: 0.5rem 2rem;
    font-size: 1.6rem;
  }

  main {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 2rem;
    gap: 2rem;
  }
</style>
