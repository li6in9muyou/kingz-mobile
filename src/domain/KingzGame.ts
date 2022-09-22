import type { Terrain } from "./Terrain";
import { Troop } from "./Troop";
import type IUpdateView from "../port/IUpdateView";
import debug from "debug";

const print = debug("KingzGame");

export type KingzGridDir = "up" | "down" | "right" | "left";

export interface KingzPlayerMove {
  cellIdx: number;
  dir: KingzGridDir;
  troopCount: number;
}

export interface KingzEnvMove {
  update(cellIdx: number): Terrain;
}

export class KingzGameState {
  cells: Terrain[];
  round_idx: number;
  executed_moves: (KingzEnvMove | KingzPlayerMove)[];
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
  ui: IUpdateView;

  constructor(ui: IUpdateView) {
    this.ui = ui;
  }

  get game_cells() {
    return this.game_state.cells;
  }

  get grid_dim() {
    return Math.floor(Math.sqrt(this.game_state.cells.length));
  }

  init_with_this_game_state(game_state: KingzGameState) {
    this.game_state = game_state;
  }

  can_continue(): boolean {
    // TODO: return true iff round_idx<300 && none of the home bases are lost to opponent
    return true;
  }

  get_valid_directions(cellIdx: number): KingzGridDir[] {
    return ["up", "right", "down", "left"];
  }

  execute_move(move: KingzPlayerMove) {
    this.move_troop_impl(move.cellIdx, {
      direction: move.dir,
      count: move.troopCount,
    });
    this.ui.update_view(this.game_state);
  }

  apply_env_update(update: KingzEnvMove) {}

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
