import type { Terrain } from "../../domain/Terrain";
import { writable } from "svelte/store";
import type { IUserInterfacePort } from "../IUserInterfacePort";

export default class SveltePort implements IUserInterfacePort {
  GameCells = writable<Terrain[]>([]);
  update_cells(cells: Terrain[]) {
    this.GameCells.set(cells);
  }
}
