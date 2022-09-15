import type { KingzGameState } from "../domain/KingzGame";

export default interface IStartGame {
  start_game(game_state: KingzGameState);
}
