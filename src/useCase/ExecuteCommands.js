import { GRID_DIM } from "../GameConfig";
import { GameState } from "../domain/GameState";
import { get } from "svelte/store";
import { battle } from "../domain/Battle";

export function moveTroop(which, how) {
  const g = get(GameState);

  const { direction } = how;

  switch (direction) {
    case "up": {
      const from_x = Math.floor(which / GRID_DIM);
      const to_x = from_x - 1;
      const from_y = Math.floor(which % GRID_DIM);
      const to_y = from_y;
      if (to_x < 0) return;
      const from = g[from_x * GRID_DIM + from_y];
      const to = g[to_x * GRID_DIM + to_y];

      const count = from.troopCount - 1;
      battle(from, to, count);
      break;
    }
    default: {
      console.log("move troop", which, how);
      break;
    }
  }
  GameState.set(g);
}
