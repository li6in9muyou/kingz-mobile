import type { KingzGridDir, KingzPlayerMove } from "../domain/KingzGame";
import type KingzGame from "../domain/KingzGame";
import type DeprecatedKingzPlayAdapter from "./DeprecatedKingzPlayAdapter";
import type { Terrain } from "../domain/Terrain";
import debug from "debug";
import type GameLifeCycle from "./GameLifeCycle";

const print = debug("PlayGame");

export default class PlayGame {
  private readonly game: KingzGame;

  constructor(game: KingzGame, private readonly gameLifeCycle: GameLifeCycle) {
    this.game = game;
  }

  on_query_cell(cellIdx: number): KingzGridDir[] {
    return this.game.get_valid_directions(cellIdx);
  }

  on_submit_command(move: KingzPlayerMove) {
    this.game.execute_move(move);
    this.gameLifeCycle.on_wait_remote_move();
    print("player submit %o", move);
    if (!this.game.can_continue()) {
      this.gameLifeCycle.on_game_ended();
    }
  }

  get_deprecated_kingz_play_adapter(): DeprecatedKingzPlayAdapter {
    // TODO: use new API directly, get rid of this adapter.
    return {
      grid_dim: this.game.grid_dim,
      canCommand: (which: Terrain) => {
        return which.troop?.isMine && which.troop.troopCount > 1;
      },
      move_troop: (
        which: number,
        detail: { direction: KingzGridDir; count: number }
      ) => {
        return this.on_submit_command({
          cellIdx: which,
          dir: detail.direction,
          troopCount: detail.count,
        });
      },
    };
  }
}
