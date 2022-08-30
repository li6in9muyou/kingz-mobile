<script>
  import Cell from "./Cell.svelte";
  import CommandMyTroop from "./CommandMyTroop.svelte";
  import { GRID_DIM, GRID_SIZE } from "./GameConfig";
  import { canCommand, moveTroop } from "./useCase/ExecuteCommands";
  import { GameState } from "./domain/GameState";
  import { onMount } from "svelte";
  import { spawnTroops } from "./domain/GameInit";

  let shouldShowDirection = false;

  let which = -1;
  let subject;

  function cellClicked(i) {
    which = i;
    subject = $GameState[i];
    shouldShowDirection = canCommand(subject);
  }

  function submitCommand(ev) {
    shouldShowDirection = false;
    moveTroop(which, ev.detail);
  }

  onMount(() => {
    GameState.set(spawnTroops(GRID_SIZE));
  });
</script>

{#if shouldShowDirection}
  <CommandMyTroop
    on:submitCommand={submitCommand}
    on:cancel={() => (shouldShowDirection = false)}
    troop={subject}
  />
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
