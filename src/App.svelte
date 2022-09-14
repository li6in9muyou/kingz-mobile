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
  import { get } from "svelte/store";

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

{#if get(stores.OnStartNewGamePage)}
  <StartNewGame use_case={OnlineUseCase} />
{/if}

{#if get(stores.OnMainGamePage)}
  <MainGame
    PlayUseCase={KingzPlayUseCase}
    InitUseCase={KingzInitUseCase}
    GameCells={stores.GameCells}
  />
{/if}

{#if showSpinner}
  <PleaseWait />
{/if}
