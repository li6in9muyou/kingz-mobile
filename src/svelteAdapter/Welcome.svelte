<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<main>
  <section on:click={() => dispatch("enterGame")}>
    <h1>Welcome to Kingz</h1>
    <div>click to enter</div>
  </section>
</main>

<style>
  * {
    color: whitesmoke;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: black;
    height: 100vh;
    width: 100vw;
  }

  section > * {
    text-align: center;
  }

  section > div {
    margin-top: 2rem;
  }

  h1 {
    animation: float 2s ease-in-out infinite;
    font-size: 4rem;
    font-family: sans-serif;
    font-weight: bold;
    background-image: linear-gradient(60deg, #e21143, #ffb03a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
