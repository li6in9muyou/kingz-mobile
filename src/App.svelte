<script lang="ts">
  import StartNewGame from "./svelteAdapter/StartNewGame.svelte";
  import { PlayUseCase } from "./domain/UseCase";
  import { onMount } from "svelte";
  import PleaseWait from "./utility/PleaseWait.svelte";
  import { HttpClient } from "./port/Infrastructure";
  import MainGame from "./svelteAdapter/MainGame.svelte";

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
  });
</script>

{#if currentPage === pageStartNewGame}
  <StartNewGame />
{/if}

{#if currentPage === pageMainGame}
  <MainGame {...currentProps} />
{/if}

{#if showSpinner}
  <PleaseWait />
{/if}

<style>
</style>
