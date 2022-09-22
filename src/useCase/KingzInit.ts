import { spawnTerrain, spawnTroops } from "../domain/GameInit";
import { flow } from "lodash";
import type { IGameConfig } from "../port/IGameConfig";

export default class {
  grid_size;

  constructor(game_config_port: IGameConfig) {
    this.grid_size = game_config_port.number_of_cells;
  }

  gen_init_cells() {
    // TODO: move this back to domain/GameInit.js
    return flow([spawnTerrain, spawnTroops])(this.grid_size);
  }
}
