<script>
  import { onDestroy } from "svelte";

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

<div id="please-wait">waiting for internet requests{dots}</div>

<style>
  #please-wait {
    font-family: monospace;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    font-size: 5rem;
    background-color: lightgreen;
    color: aliceblue;
    padding: 2rem;
  }
</style>
