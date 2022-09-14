import type { Terrain } from "../../domain/Terrain";
import { derived, get, writable } from "svelte/store";
import type { IUserInterfacePort } from "../IUserInterfacePort";
import type { IGameCellsPersistence } from "../IGameCellsPersistence";

const pageStartNewGame = 9;
const pageMainGame = 42;

export default class SveltePort
  implements IUserInterfacePort, IGameCellsPersistence
{
  GameCells = writable<Terrain[]>([]);
  CurrentPage = writable<Number>(pageStartNewGame);
  OnStartNewGamePage = derived(
    this.CurrentPage,
    (cp) => cp === pageStartNewGame
  );
  OnMainGamePage = derived(this.CurrentPage, (cp) => cp === pageMainGame);

  get_current_game_cells(): Terrain[] {
    return [...get(this.GameCells)];
  }

  update_cells(cells: Terrain[]) {
    this.GameCells.set(cells);
  }

  init() {
    this.CurrentPage.set(pageMainGame);
  }
}
