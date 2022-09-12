import type { IGameConfig } from "../IGameConfig";

export default class LiteralGameConfig implements IGameConfig {
  readonly number_of_cells = 100;
}
