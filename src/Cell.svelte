<script>
  import { Terrain } from "./domain/Terrain";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let terrain = Terrain.buildPlain();

  function handleClick() {
    dispatch("cellClicked");
  }
</script>

{#if terrain.troop}
  <div
    class="cell"
    class:my-troop={terrain.troop.isMine}
    class:neutral-troop={terrain.troop.isNeutral}
    class:opposing-troop={terrain.troop.isEnemy}
    class:fortress={terrain.isFortress}
    on:click={handleClick}
  >
    {terrain.troop.troopCount > 0 ? terrain.troop.troopCount : ""}
  </div>
{:else}
  <div
    class="cell"
    class:plain={terrain.isPlain}
    class:mountain={terrain.isMountain}
    class:home-base={terrain.isHome || terrain.isEnemyHome}
    on:click={handleClick}
  />
{/if}

<style>
  .cell {
    color: black;
    font-size: 1rem;
    height: 100%;
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: whitesmoke;
    border: dashed 1px darkgray;
  }

  .my-troop {
    background-color: lightblue;
  }

  .opposing-troop {
    background-color: lightpink;
  }

  .neutral-troop {
    background-color: lightgray;
  }

  .fortress {
    --thickness: 4px;
    outline: solid var(--thickness) darkolivegreen;
    outline-offset: calc(-1 * var(--thickness));
  }

  .mountain {
    background-color: saddlebrown;
  }
</style>
