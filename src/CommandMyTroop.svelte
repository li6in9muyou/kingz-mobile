<!-- Default data -->
<script>
  import { Troop } from "./domain/Troop";
  import { createEventDispatcher } from "svelte";

  export let troop = Troop.buildNeutral(0);

  const dispatch = createEventDispatcher();

  function submit(dir) {
    dispatch("submitCommand", { direction: dir, count: moveCount });
  }

  let moveCount = troop.troopCount - 1;
</script>

<main>
  <div id="cancelBtn" on:click={() => dispatch("cancel")}>cancel</div>
  <button on:click={() => submit("up")}> up</button>

  <div class="row">
    <button on:click={() => submit("left")}> left</button>
    <button on:click={() => submit("right")}> right</button>
  </div>

  <button on:click={() => submit("down")}> down</button>

  <div id="troopCountContainer">
    <span>{moveCount}/{troop.troopCount - 1}</span>
    <input
      bind:value={moveCount}
      class="slider"
      id="troopCount"
      max={troop.troopCount - 1}
      min="1"
      type="range"
    />
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
    border-radius: 0.3rem;
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
    gap: 30px;
    color: lightgoldenrodyellow;
    padding: 10px 0;
  }

  #cancelBtn {
    background-color: yellow;
    color: red;
    font-weight: bold;
    font-size: 1.3rem;
    text-align: center;
    padding: 0.3rem 5rem;
    margin: 2rem 0;
  }
</style>
