<script>
  import Cell from "./Cell.svelte";
  import Direction from "./Direction.svelte";
  import { GRID_DIM, GRID_SIZE } from "./GameConfig";
  import { moveTroop } from "./useCase/ExecuteCommands";
  import { GameState } from "./domain/GameState";
  import { onMount } from "svelte";
  import { spawnTroops } from "./domain/GameInit";

  let shouldShowDirection = false;

  let direction = "";
  let subjectedCell = -1;

  function cellClicked(i) {
    subjectedCell = i;
    shouldShowDirection = true;
  }

  function directionChosen(ev) {
    direction = ev.detail.direction;
    shouldShowDirection = false;
    moveTroop(subjectedCell, { direction: direction });
  }

  onMount(() => {
    GameState.set(spawnTroops(GRID_SIZE));
  });
</script>

{#if shouldShowDirection}
  <Direction on:directionChosen={directionChosen} />
{/if}

<main>
  <h1>Hello, Kingz</h1>
  <div id="Grid" style="--GRID_DIM:{GRID_DIM}">
    {#each $GameState as data, index}
      <Cell on:cellClicked={() => cellClicked(index)} {data} />
    {/each}
  </div>
</main>

<!-- Include styles -->
<style>
  #Grid {
    display: grid;
    grid-template-columns: repeat(var(--GRID_DIM), 1fr);
    gap: 3px;
    width: 100%;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
  }
</style>
