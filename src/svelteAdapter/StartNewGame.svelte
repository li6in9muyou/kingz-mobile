<script lang="ts">
  import type { default as OnlineRegister } from "../useCase/OnlineRegister";

  export let use_case: OnlineRegister;
</script>

<h1>To start new Game, enter a nickname</h1>
<input id="nickname" type="text" />
<button
  on:click={() => {
    use_case.register(document.getElementById("nickname").value);
  }}
>
  submit
</button>
