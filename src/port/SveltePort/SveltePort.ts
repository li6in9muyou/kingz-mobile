import type { Terrain } from "../../domain/Terrain";
import { get, writable } from "svelte/store";
import type { IUserInterfacePort } from "../IUserInterfacePort";
import type { IGameCellsPersistence } from "../IGameCellsPersistence";

export default class SveltePort
  implements IUserInterfacePort, IGameCellsPersistence
{
  GameCells = writable<Terrain[]>([]);

  get_current_game_cells(): Terrain[] {
    return [...get(this.GameCells)];
  }

  update_cells(cells: Terrain[]) {
    this.GameCells.set(cells);
  }
}
