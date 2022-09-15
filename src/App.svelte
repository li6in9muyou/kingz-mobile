<script lang="ts">
  import StartNewGame from "./svelteAdapter/StartNewGame.svelte";
  import { onMount } from "svelte";
  import PleaseWait from "./utility/PleaseWait.svelte";
  import { HttpClient } from "./useCase/Infrastructure";
  import MainGame from "./svelteAdapter/MainGame.svelte";
  import SveltePort from "./port/SveltePort/SveltePort";
  import GameLifeCycle from "./useCase/GameLifeCycle";
  import KingzInitUseCase from "./useCase/KingzInit";
  import PlayGame from "./useCase/PlayGame";
  import Welcome from "./svelteAdapter/Welcome.svelte";

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
  let currentPage = stores.CurrentPage;

  onMount(() => {
    gameLifeCycle.on_boot(stores);
    localPlayer = gameLifeCycle.localPlayer;
    KingzPlayUseCase = new PlayGame(gameLifeCycle.game);
    HttpClient.subscribe("StartRequest", PleaseWaitPage.open);
    HttpClient.subscribe("DoneRequest", PleaseWaitPage.close);
  });
</script>

{#if $currentPage === 9}
  <StartNewGame use_case={localPlayer} />
{/if}

{#if $isOnMainGamePage}
  <MainGame
    PlayUseCase={KingzPlayUseCase.get_deprecated_kingz_play_adapter()}
    InitUseCase={KingzInitUseCase}
    GameCells={stores.GameCells}
  />
{/if}

{#if showSpinner}
  <PleaseWait />
{/if}

{#if $isOnWelcomePage}
  <Welcome />
{/if}
