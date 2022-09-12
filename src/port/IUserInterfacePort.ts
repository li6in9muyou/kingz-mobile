import type { Terrain } from "../domain/Terrain";

export interface IUserInterfacePort {
  update_cells(cells: Terrain[]): void;
}
