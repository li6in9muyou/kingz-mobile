import { GRID_DIM } from "../GameConfig";
import { Troop } from "../domain/Troop";
import type { IGameConfig } from "../port/IGameConfig";
import type { IUserInterfacePort } from "../port/IUserInterfacePort";
import type { Terrain } from "../domain/Terrain";
import type { IGameCellsPersistence } from "../port/IGameCellsPersistence";
import KingzInit from "./KingzInit";

function move(f, t, count) {
  console.log("move", f, t, count);
  if (t.isMountain) return;

  if (t.troop === null) {
    t.troop = Troop.buildMine(count);
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

export default class KingzPlay {
  grid_size;
  ui_port;
  persistence_port: IGameCellsPersistence;
  private init_use_case;

  constructor(
    game_config_port: IGameConfig,
    ui_port: IUserInterfacePort,
    persistence_port: IGameCellsPersistence
  ) {
    this.persistence_port = persistence_port;
    this.grid_size = game_config_port.number_of_cells;
    this.ui_port = ui_port;
    this.init_use_case = new KingzInit(game_config_port);
  }

  get game_cells() {
    return this.persistence_port.get_current_game_cells();
  }

  get grid_dim() {
    return Math.floor(Math.sqrt(this.grid_size));
  }

  start_with_these_cells(cells: Terrain[]) {
    this.ui_port.update_cells(cells);
  }

  boot() {
    this.start_with_these_cells(this.init_use_case.gen_init_cells());
  }

  canCommand(cell: Terrain) {
    return cell.troop?.isMine && cell.troop.troopCount > 1;
  }

  move_troop(which: number, how: any) {
    this.move_troop_impl.apply(this, arguments);
    this.ui_port.update_cells([...this.game_cells]);
  }

  private move_troop_impl(which: number, how: any) {
    const g = this.game_cells;
    const { direction, count } = how;
    console.log(`move troop command: no.${which} ${direction} ${count}`);

    let from, to;
    switch (direction) {
      case "up": {
        const from_x = Math.floor(which / GRID_DIM);
        const to_x = from_x - 1;
        const from_y = Math.floor(which % GRID_DIM);
        const to_y = from_y;
        if (to_x < 0) return;
        from = g[from_x * GRID_DIM + from_y];
        to = g[to_x * GRID_DIM + to_y];
        break;
      }
      case "left": {
        const from_x = Math.floor(which / GRID_DIM);
        const to_x = from_x;
        const from_y = Math.floor(which % GRID_DIM);
        const to_y = from_y - 1;
        if (to_y < 0) return;
        from = g[from_x * GRID_DIM + from_y];
        to = g[to_x * GRID_DIM + to_y];
        break;
      }
      case "right": {
        const from_x = Math.floor(which / GRID_DIM);
        const to_x = from_x;
        const from_y = Math.floor(which % GRID_DIM);
        const to_y = from_y + 1;
        if (to_y > GRID_DIM - 1) return;
        from = g[from_x * GRID_DIM + from_y];
        to = g[to_x * GRID_DIM + to_y];
        break;
      }
      case "down": {
        const from_x = Math.floor(which / GRID_DIM);
        const to_x = from_x + 1;
        const from_y = Math.floor(which % GRID_DIM);
        const to_y = from_y;
        if (to_x > GRID_DIM - 1) return;
        from = g[from_x * GRID_DIM + from_y];
        to = g[to_x * GRID_DIM + to_y];
        break;
      }
      default: {
        break;
      }
    }
    move(from, to, count);
  }
}
