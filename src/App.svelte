<script lang="ts">
  import StartNewGame from "./svelteAdapter/StartNewGame.svelte";
  import { onMount } from "svelte";
  import PleaseWait from "./utility/PleaseWait.svelte";
  import { HttpClient } from "./useCase/Infrastructure";
  import MainGame from "./svelteAdapter/MainGame.svelte";
  import SveltePort from "./port/SveltePort/SveltePort";
  import GameLifeCycle from "./useCase/GameLifeCycle";
  import KingzInitUseCase from "./useCase/KingzInit";
  import PlayerAgent from "./useCase/PlayerAgent";
  import Welcome from "./svelteAdapter/Welcome.svelte";
  import GameOver from "./svelteAdapter/GameOver.svelte";

  let showSpinner = false;

  const PleaseWaitPage = {
    open() {
      showSpinner = true;
    },
    close() {
      showSpinner = false;
    },
  };

  const stores = new SveltePort();
  const gameLifeCycle = new GameLifeCycle(stores);
  let localPlayer, KingzPlayUseCase;
  let isOnWelcomePage = stores.OnWelcomePage;
  let isOnMainGamePage = stores.OnMainGamePage;
  let isOnGameOverPage = stores.OnGameOverPage;
  let currentPage = stores.CurrentPage;

  function enter_game() {
    gameLifeCycle.on_boot(stores);
    localPlayer = gameLifeCycle.localPlayer;
    KingzPlayUseCase = new PlayerAgent(gameLifeCycle.game, gameLifeCycle);
    gameLifeCycle.playerAgent = KingzPlayUseCase;
  }

  onMount(() => {
    stores.init();
    HttpClient.subscribe("StartRequest", PleaseWaitPage.open);
    HttpClient.subscribe("DoneRequest", PleaseWaitPage.close);
  });
</script>

{#if $currentPage === 9}
  <StartNewGame use_case={localPlayer} />
{/if}

{#if $isOnMainGamePage}
  <MainGame
    {gameLifeCycle}
    PlayUseCase={KingzPlayUseCase.get_deprecated_kingz_play_adapter()}
    InitUseCase={KingzInitUseCase}
    GameCells={stores.GameCells}
  />
{/if}

{#if showSpinner}
  <PleaseWait />
{/if}

{#if $isOnWelcomePage}
  <Welcome on:enterGame={enter_game} />
{/if}

{#if $isOnGameOverPage}
  <GameOver
    on:backToWelcomePage={() => {
      stores.init();
    }}
  />
{/if}
