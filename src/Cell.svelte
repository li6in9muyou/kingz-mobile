<script>
  export let data;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("cellClicked");
  }
</script>

<button
  class:my-troop={data.troopOwner === "blue"}
  class:none-troop={data.troopOwner === "none"}
  class:opposing-troop={data.troopOwner === "red"}
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
