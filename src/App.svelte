<script lang="ts">
  import StartNewGame from "./svelteAdapter/StartNewGame.svelte";
  import { onMount } from "svelte";
  import PleaseWait from "./utility/PleaseWait.svelte";
  import { HttpClient } from "./useCase/Infrastructure";
  import MainGame from "./svelteAdapter/MainGame.svelte";
  import KingzPlay from "./useCase/KingzPlay";
  import LiteralGameConfig from "./port/LiteralGameConfig/LiteralGameConfig";
  import SveltePort from "./port/SveltePort/SveltePort";
  import KingzInit from "./useCase/KingzInit";
  import OnlineRegister from "./useCase/OnlineRegister";

  const pageStartNewGame = 9;
  const pageMainGame = 42;

  let currentPage = pageStartNewGame;
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
  const config = new LiteralGameConfig();
  const KingzPlayUseCase = new KingzPlay(config, stores, stores);
  const OnlineUseCase = new OnlineRegister(KingzPlayUseCase);
  const KingzInitUseCase = new KingzInit(config);

  onMount(() => {
    HttpClient.subscribe("StartRequest", PleaseWaitPage.open);
    HttpClient.subscribe("DoneRequest", PleaseWaitPage.close);
  });
</script>

{#if currentPage === pageStartNewGame}
  <StartNewGame use_case={OnlineUseCase} />
{/if}

{#if currentPage === pageMainGame}
  <MainGame
    PlayUseCase={KingzPlayUseCase}
    InitUseCase={KingzInitUseCase}
    GameCells={stores.GameCells}
  />
{/if}

{#if showSpinner}
  <PleaseWait />
{/if}
