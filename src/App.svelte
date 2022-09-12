<script lang="ts">
  import StartNewGame from "./svelteAdapter/StartNewGame.svelte";
  import { PlayUseCase } from "./domain/UseCase";
  import { onMount } from "svelte";
  import PleaseWait from "./utility/PleaseWait.svelte";
  import { HttpClient } from "./port/Infrastructure";
  import MainGame from "./svelteAdapter/MainGame.svelte";
  import KingzPlay from "./useCase/KingzPlay";
  import LiteralGameConfig from "./port/LiteralGameConfig/LiteralGameConfig";
  import SveltePort from "./port/SveltePort/SveltePort";
  import KingzInit from "./useCase/KingzInit";

  const pageStartNewGame = 9;
  const pageMainGame = 42;

  let currentPage = pageStartNewGame;
  let currentProps = null;
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
  const KingzInitUseCase = new KingzInit(config);

  onMount(() => {
    PlayUseCase.subscribe("GameStart", (context) => {
      currentPage = pageMainGame;
      currentProps = context;
    });
    PlayUseCase.subscribe("GameUpdate", (context) => {
      currentPage = pageMainGame;
      currentProps = context;
    });
    HttpClient.subscribe("StartRequest", PleaseWaitPage.open);
    HttpClient.subscribe("DoneRequest", PleaseWaitPage.close);
    PlayUseCase.boot();
  });
</script>

{#if currentPage === pageStartNewGame}
  <StartNewGame />
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
