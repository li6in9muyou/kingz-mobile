import type { KingzGameState } from "src/domain/KingzGame";
import type IKingzEnvMove from "../port/IKingzEnvMove";
import type { Terrain } from "../domain/Terrain";

export type IUpdater = (idx: number) => number;

export default class implements IKingzEnvMove {
  constructor(
    private readonly config: { home_base: IUpdater; neutral: IUpdater } = {
      home_base: (idx) => idx / 2,
      neutral: (idx) => idx / 2,
    }
  ) {}

  update(
    cell: Terrain,
    roundIdx?: number,
    game_state?: KingzGameState
  ): Terrain {
    if (cell.troop !== null) {
      cell.troop.troopCount += 1;
    }
    return cell;
  }
}
