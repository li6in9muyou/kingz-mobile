<!-- Default data -->
<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick(dir) {
    dispatch("directionChosen", { direction: dir });
  }
</script>

<main>
  <button on:click={() => handleClick("up")}> up</button>

  <div class="row">
    <button on:click={() => handleClick("left")}> left</button>
    <button on:click={() => handleClick("right")}> right</button>
  </div>

  <button on:click={() => handleClick("down")}> down</button>
  <div id="troopCountContainer">
    <span>12/15</span>
    <input class="slider" id="troopCount" max="30" min="5" type="range" value="29">
  </div>
</main>

<!-- Include styles -->
<style>
  button {
    font-family: monospace;
    min-width: 150px;
    margin: 2rem 2rem;
    padding: 1rem;
    border-radius: 0.3rem;
    background-color: lightblue;
    font-size: 2rem;
  }

  .row {
    display: flex;
    justify-content: space-evenly;
  }

  main {
    color: lightgray;
    background-color: rgba(90, 0, 0, 0.6);
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;
  }

  .slider {
    --height: 30px;

    margin: 0;
    -webkit-appearance: none;
    appearance: none;
    width: 60vw;
    max-height: var(--height);
    background: lightgoldenrodyellow;
    outline: none;
    border-radius: .3rem;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: var(--height);
    aspect-ratio: 1;
    background: lightpink;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    height: var(--height);
    aspect-ratio: 1;
    background: lightpink;
    cursor: pointer;
  }

  #troopCountContainer {
    display: flex;
    align-items: center;
    font-size: 2rem;
    gap:30px;
    color: lightgoldenrodyellow;
    padding: 10px 0;
  }
</style>
