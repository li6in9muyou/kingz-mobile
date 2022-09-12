import type { Terrain } from "../domain/Terrain";

export interface IGameCellsPersistence {
  get_current_game_cells(): Terrain[];
}
