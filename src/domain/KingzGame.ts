import type { Terrain } from "./Terrain";
import { Troop } from "./Troop";
import debug from "debug";
import type IKingzEnvMove from "../port/IKingzEnvMove";
import StrongerOverTime from "../useCase/StrongerOverTime";

const print = debug("KingzGame");

export type KingzGridDir = "up" | "down" | "right" | "left";

export interface KingzPlayerMove {
  cellIdx: number;
  dir: KingzGridDir;
  troopCount: number;
}

export class KingzGameState {
  cells: Terrain[];
  round_idx: number;
  executed_moves: (IKingzEnvMove | KingzPlayerMove)[];
}

function move(f, t, count) {
  print("move from %o to %o, troop: %d", f, t, count);
  if (t.isMountain) return;

  if (t.troop === null) {
    t.troop = new Troop(count, f.troop.troopOwner);
    f.troop.troopCount -= count;
    return;
  }

  const from = f.troop;
  const to = t.troop;
  if (count > from.troopCount) {
    throw {
      type: "invalid parameters",
      cause: "moving more troop than you have",
    };
  }

  if (from.troopOwner === to.troopOwner) {
    from.troopCount -= count;
    to.troopCount += count;
  } else {
    if (count > to.troopCount) {
      to.troopOwner = from.troopOwner;
    }

    from.troopCount -= count;
    to.troopCount -= count;
    to.troopCount = Math.abs(to.troopCount);

    if (count === to.troopCount) {
      from.troopCount = 0;
      from.troopOwner = "none";
      to.troopCount = 0;
      to.troopOwner = "none";
    }
  }
}

export default class KingzGame {
  game_state: KingzGameState;
  private local_has_moved: boolean = false;
  private remote_has_moved: boolean = false;
  private readonly env_moves: IKingzEnvMove[] = [new StrongerOverTime()];

  constructor() {}

  get game_cells() {
    return this.game_state.cells;
  }

  get grid_dim() {
    return Math.floor(Math.sqrt(this.game_state.cells.length));
  }

  init_with_this_game_state(game_state: KingzGameState) {
    this.game_state = game_state;
  }

  has_both_player_moved() {
    return this.local_has_moved && this.remote_has_moved;
  }

  can_continue(): boolean {
    // TODO: return true iff round_idx<300 && none of the home bases are lost to opponent
    return true;
  }

  get_valid_directions(cellIdx: number): KingzGridDir[] {
    // TODO: cannot move into mountains
    return ["up", "right", "down", "left"];
  }

  execute_move(move: KingzPlayerMove) {
    if (this.has_both_player_moved()) {
      console.trace();
      print("error: execute_move is called even if both players have moved");
      return;
    }
    const this_troop = this.game_state.cells[move.cellIdx].troop;
    if (this_troop.isMine) {
      this.local_has_moved = true;
    } else if (this_troop.isEnemy) {
      this.remote_has_moved = true;
    } else {
      throw new Error(`this troop ${this_troop} should not be moved`);
    }

    this.move_troop_impl(move.cellIdx, {
      direction: move.dir,
      count: move.troopCount,
    });
  }

  start_next_round() {
    this.local_has_moved = false;
    this.remote_has_moved = false;
    this.game_state.round_idx += 1;
    for (const env_move of this.env_moves) {
      this.apply_env_update(env_move);
    }
  }

  apply_env_update(m: IKingzEnvMove) {
    for (let idx = 0; idx < this.game_state.cells.length; idx++) {
      this.game_state.cells[idx] = m.update(
        this.game_state[idx],
        idx,
        this.game_state
      );
    }
  }

  private move_troop_impl(
    which: number,
    how: { direction: KingzGridDir; count: number }
  ) {
    const g = this.game_cells;
    const { direction, count } = how;
    print(`move troop command: no.${which} ${direction} troops ${count}`);

    let from, to;
    switch (direction) {
      case "up": {
        const from_x = Math.floor(which / this.grid_dim);
        const to_x = from_x - 1;
        const from_y = Math.floor(which % this.grid_dim);
        const to_y = from_y;
        if (to_x < 0) return;
        from = g[from_x * this.grid_dim + from_y];
        to = g[to_x * this.grid_dim + to_y];
        break;
      }
      case "left": {
        const from_x = Math.floor(which / this.grid_dim);
        const to_x = from_x;
        const from_y = Math.floor(which % this.grid_dim);
        const to_y = from_y - 1;
        if (to_y < 0) return;
        from = g[from_x * this.grid_dim + from_y];
        to = g[to_x * this.grid_dim + to_y];
        break;
      }
      case "right": {
        const from_x = Math.floor(which / this.grid_dim);
        const to_x = from_x;
        const from_y = Math.floor(which % this.grid_dim);
        const to_y = from_y + 1;
        if (to_y > this.grid_dim - 1) return;
        from = g[from_x * this.grid_dim + from_y];
        to = g[to_x * this.grid_dim + to_y];
        break;
      }
      case "down": {
        const from_x = Math.floor(which / this.grid_dim);
        const to_x = from_x + 1;
        const from_y = Math.floor(which % this.grid_dim);
        const to_y = from_y;
        if (to_x > this.grid_dim - 1) return;
        from = g[from_x * this.grid_dim + from_y];
        to = g[to_x * this.grid_dim + to_y];
        break;
      }
      default: {
        break;
      }
    }
    move(from, to, count);
  }
}
