import type { Terrain } from "../domain/Terrain";
import type { KingzGridDir } from "../domain/KingzGame";

// TODO: get rid of this adapter
export default interface DeprecatedKingzPlayAdapter {
  grid_dim: number;
  canCommand(which: Terrain): boolean;
  move_troop(which: number, detail: { direction: KingzGridDir; count: number });
}
