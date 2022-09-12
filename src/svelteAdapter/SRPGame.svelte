<script>
  import { join } from "lodash";
  import { PlayUseCase } from "../domain/UseCase";

  export let nickname = "";
  export let state = {};

  const to_human_readable = (ch) =>
    ({ p: "paper", s: "scissor", r: "rock" }[ch]);
</script>

<div>
  <h1>Game started, pick your move:</h1>
  <h2>Played as {nickname}</h2>
  <h3>
    Previous moves: {join(state.response.map(to_human_readable))}
  </h3>
  <h3>Previous results: {state.results}</h3>
  <h3>
    Opponent moves:{" "}
    {join(state.request.slice(0, state.response.length).map(to_human_readable))}
  </h3>
  <input id="move-s" name="move" type="radio" value="s" />
  <label for="move-s">scissor</label>
  <input id="move-r" name="move" type="radio" value="r" />
  <label for="move-r">rock</label>
  <input id="move-p" name="move" type="radio" value="p" />
  <label for="move-p">paper</label>
  <button
    on:click={() =>
      PlayUseCase.submit_command({
        move: document.querySelector('input[name="move"]:checked').value,
      })}
  >
    battle!
  </button>
  <button>quit</button>
  <button
    on:click={() =>
      PlayUseCase.select_save_slot("Save current game", PlayUseCase.save)}
  >
    save and quit
  </button>
</div>
