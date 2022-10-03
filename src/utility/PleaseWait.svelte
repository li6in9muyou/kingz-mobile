<script>
  import { onDestroy } from "svelte";
  import { slide } from "svelte/transition";

  let dots = "";
  const handle = setInterval(() => {
    if (dots.length === 6) {
      dots = "";
    } else {
      dots += ".";
    }
  }, 100);
  onDestroy(() => {
    clearInterval(handle);
  });
</script>

<div id="please-wait" transition:slide>
  waiting for internet requests
  <div>{dots}</div>
</div>

<style>
  #please-wait {
    font-family: monospace;
    box-sizing: border-box;
    color: black;
    background-color: lightgreen;
    position: fixed;
    margin: 1rem;
    bottom: 0;
    z-index: 999;
    font-size: 2rem;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  #please-wait > div {
    min-height: 3rem;
  }
</style>
