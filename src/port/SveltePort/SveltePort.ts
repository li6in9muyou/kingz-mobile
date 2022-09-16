import type { Terrain } from "../../domain/Terrain";
import { derived, get, writable } from "svelte/store";
import type { IUserInterfacePort } from "../IUserInterfacePort";
import type { IGameCellsPersistence } from "../IGameCellsPersistence";
import type IPromptNickName from "../IPromptNickName";
import type IUpdateView from "../IUpdateView";
import type { KingzGameState } from "../../domain/KingzGame";
import debug from "debug";

const print = debug("SveltePort");

const pageStartNewGame = 9;
const pageWelcome = 1;
const pageMainGame = 42;
const pageEndGame = 123;

export default class SveltePort
  implements
    IUserInterfacePort,
    IGameCellsPersistence,
    IPromptNickName,
    IUpdateView
{
  GameCells = writable<Terrain[]>([]);
  CurrentPage = writable<Number>(pageWelcome);
  OnStartNewGamePage = derived(
    this.CurrentPage,
    (cp) => cp === pageStartNewGame
  );
  OnMainGamePage = derived(this.CurrentPage, (cp) => cp === pageMainGame);
  OnWelcomePage = derived(this.CurrentPage, (cp) => cp === pageWelcome);
  OnGameOverPage = derived(this.CurrentPage, (cp) => cp === pageEndGame);

  get_current_game_cells(): Terrain[] {
    return [...get(this.GameCells)];
  }

  update_cells(cells: Terrain[]) {
    this.GameCells.set(cells);
  }

  init() {
    this.CurrentPage.set(pageWelcome);
  }

  prompt_nick_name() {
    print("go to pageStateNewGame");
    this.CurrentPage.set(pageStartNewGame);
  }

  update_view(game_state: KingzGameState) {
    print("update view", game_state);
    this.GameCells.set(game_state.cells);
  }

  start_game(game_state: KingzGameState) {
    print("go to pageMainGame");
    this.CurrentPage.set(pageMainGame);
    this.update_view(game_state);
  }

  end_game() {
    this.CurrentPage.set(pageEndGame);
  }
}

export class Routing implements IPromptNickName {
  port: SveltePort;

  constructor(port: SveltePort) {
    this.port = port;
  }

  prompt_nick_name() {
    this.port.CurrentPage.set(pageStartNewGame);
  }
}
