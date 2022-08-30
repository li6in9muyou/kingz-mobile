<script>
  import Cell from "./Cell.svelte";
  import CommandMyTroop from "./CommandMyTroop.svelte";
  import { GRID_DIM } from "./GameConfig";
  import { canCommand, moveTroop } from "./useCase/ExecuteCommands";
  import { GameCells } from "./domain/GameState";
  import { onMount } from "svelte";
  import { gameInit } from "./domain/GameInit";
  import { get } from "svelte/store";

  let shouldShowDirection = false;

  let which = -1;

  function actionOnCell(i) {
    which = i;
    shouldShowDirection = canCommand($GameCells[which]);
  }

  function submitCommand(ev) {
    moveTroop(which, ev.detail);
    which = -1;
    shouldShowDirection = false;
  }

  onMount(() => {
    gameInit();
    console.log('after init, cells', get(GameCells));
  });
</script>

{#if shouldShowDirection}
  <CommandMyTroop
    on:submitCommand={submitCommand}
    on:cancel={() => (shouldShowDirection = false)}
    troop={$GameCells[which].troop}
  />
{/if}

<main>
  <h1>Hello, Kingz</h1>
  <div id="Grid" style="--GRID_DIM:{GRID_DIM}">
    {#each $GameCells as terrain, index}
      <Cell on:cellClicked={() => actionOnCell(index)} {terrain} />
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
