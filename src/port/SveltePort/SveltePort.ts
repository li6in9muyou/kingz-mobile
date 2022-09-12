import type { Terrain } from "../../domain/Terrain";
import { writable } from "svelte/store";

export default class SveltePort {
  GameCells = writable<Terrain[]>([]);
  update_cells(cells: Terrain[]) {
    this.GameCells.set(cells);
  }
}
