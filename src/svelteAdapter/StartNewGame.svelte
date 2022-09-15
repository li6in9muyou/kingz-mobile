<script lang="ts">
  import LocalPlayer from "../useCase/LocalPlayer";

  export let use_case: LocalPlayer;
</script>

<h1>To start new Game, enter a nickname</h1>
<input id="nickname" type="text" />
<button
  on:click={() => {
    use_case.on_register(document.getElementById("nickname").value);
  }}
>
  submit
</button>
