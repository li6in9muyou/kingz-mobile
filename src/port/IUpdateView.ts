import type { KingzGameState } from "../domain/KingzGame";

export default interface IUpdateView {
  update_view(game_state: KingzGameState);
}
