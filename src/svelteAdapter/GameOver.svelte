<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<h1>Game Over</h1>
<p>
  <button on:click={() => dispatch("backToWelcomePage")}>Restart</button>
</p>
