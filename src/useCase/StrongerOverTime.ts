import type { KingzGameState } from "src/domain/KingzGame";
import type IKingzEnvMove from "../port/IKingzEnvMove";
import type { Terrain } from "../domain/Terrain";

export default class implements IKingzEnvMove {
  update(
    cell: Terrain,
    cellIdx?: number,
    game_state?: KingzGameState
  ): Terrain {
    console.error("this is a stub implementation!");
    if (cell.troop !== null) {
      cell.troop.troopCount += 1;
    }
    return cell;
  }
}
