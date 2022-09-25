import type { Terrain } from "../domain/Terrain";
import type { KingzGameState } from "../domain/KingzGame";

export default interface IKingzEnvMove {
  update(cell: Terrain, cellIdx?: number, game_state?: KingzGameState): Terrain;
}
