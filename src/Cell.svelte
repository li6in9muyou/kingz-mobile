<script>
  export let data;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("cellClicked");
  }
</script>

<button
  class:my-troop={data.isMine}
  class:none-troop={data.isNeutral}
  class:opposing-troop={data.isEnemy}
  on:click={handleClick}>{data.troopCount}</button
>

<!-- Include styles -->
<style>
  button {
    color: black;
    font-size: 1rem;
    height: 100%;
    width: 100%;
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
