import { spawnTerrain, spawnTroops } from "../domain/GameInit";
import { flow } from "lodash";

export default new (class {
  grid_size;

  constructor(game_config_port) {
    this.grid_size = game_config_port.get_config("grid_size");
  }

  gen_init_cells() {
    return flow([spawnTerrain, spawnTroops])(this.grid_size);
  }
})();
