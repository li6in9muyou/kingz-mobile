import { GRID_DIM } from "../GameConfig";
import { GameState } from "../domain/GameState";
import { get } from "svelte/store";
import { Troop } from "../domain/Troop";

export function move(f, t, count) {
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

export function canCommand(cell) {
  return cell.troop && cell.troop.isMine;
}

export function moveTroop(which, how) {
  const s = get(GameState);
  const g = s.cells;

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
  console.log("after move", s);

  GameState.set(s);
}
