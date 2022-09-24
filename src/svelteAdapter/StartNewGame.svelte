<script lang="ts">
  import LocalIdentity from "../useCase/LocalIdentity";

  export let use_case: LocalIdentity;
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
