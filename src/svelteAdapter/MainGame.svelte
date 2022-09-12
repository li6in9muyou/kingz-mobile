<script lang="ts">
  import Cell from "./Cell.svelte";
  import CommandMyTroop from "./CommandMyTroop.svelte";
  import { get } from "svelte/store";
  import { every, isNull, negate } from "lodash";
  import KingzPlay from "../useCase/KingzPlay";
  import KingzInit from "../useCase/KingzInit";
  import { onMount } from "svelte";

  export let GameCells = null;
  export let PlayUseCase: KingzPlay = null;
  export let InitUseCase: KingzInit = null;
  console.assert(every([GameCells, PlayUseCase, InitUseCase], negate(isNull)));
  const GRID_DIM = PlayUseCase.grid_dim;

  let shouldShowDirection = false;

  let which = -1;

  function actionOnCell(i) {
    which = i;
    shouldShowDirection = PlayUseCase.canCommand($GameCells[which]);
  }

  function submitCommand(ev) {
    PlayUseCase.move_troop(which, ev.detail);
    which = -1;
    shouldShowDirection = false;
  }

  onMount(() => {
    PlayUseCase.start_with_these_cells(InitUseCase.gen_init_cells());
    console.log("after init, cells", get(GameCells));
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
    justify-items: center;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 10px;
  }
</style>
