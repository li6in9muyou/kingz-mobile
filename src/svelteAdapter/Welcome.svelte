<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<h1>Welcome to Kingz</h1>
<p>
  <button on:click={() => dispatch("enterGame")}>Enter game</button>
</p>
