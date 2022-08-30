<script>
  export let data;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("cellClicked");
  }
</script>

<div
  class="cell"
  class:my-troop={data.isMine}
  class:none-troop={data.isNeutral}
  class:opposing-troop={data.isEnemy}
  on:click={handleClick}
>
  {data.troopCount > 0 ? data.troopCount : ""}
</div>

<!-- Include styles -->
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
  }

  .my-troop {
    background-color: lightblue;
  }

  .opposing-troop {
    background-color: lightpink;
  }

  .none-troop {
    background-color: lightgray;
  }
</style>
