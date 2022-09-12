<script>
  import { PlayUseCase } from "../domain/UseCase";
</script>

<h1>To start new Game, enter a nickname</h1>
<input id="nickname" type="text" />
<button
  on:click={() => {
    PlayUseCase.start_new_game(document.getElementById("nickname").value);
  }}
>
  submit
</button>
