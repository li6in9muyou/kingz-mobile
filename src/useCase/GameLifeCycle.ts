import KingzInit from "./KingzInit";
import LiteralGameConfig from "../port/LiteralGameConfig/LiteralGameConfig";
import KingzGame from "../domain/KingzGame";
import type IEndGame from "../port/IEndGame";
import LocalPlayer from "./LocalPlayer";
import type IUpdateView from "../port/IUpdateView";
import type IPromptNickName from "../port/IPromptNickName";
import RemotePlayer from "./RemotePlayer";
import type IStartGame from "../port/IStartGame";
import debug from "debug";
const print = debug("GameLifeCycle");

export default class GameLifeCycle {
  ui: IEndGame & IStartGame;
  localPlayer: LocalPlayer;
  remotePlayer: RemotePlayer;
  game: KingzGame;

  constructor(ui: IEndGame & IStartGame) {
    this.ui = ui;
  }

  on_boot(ui: IUpdateView & IPromptNickName & IStartGame) {
    // create game
    this.game = new KingzGame(ui);
    this.game.init_with_this_game_state({
      cells: new KingzInit(new LiteralGameConfig()).gen_init_cells(),
      round_idx: 0,
      executed_moves: [],
    });
    // create local player
    this.localPlayer = new LocalPlayer(ui);
    // create remote player
    this.remotePlayer = new RemotePlayer();
    this.on_game_start();
  }

  on_game_ended() {
    this.ui.end_game();
  }

  on_game_start() {
    print(`game started %O`, this.game);
    this.ui.start_game(this.game.game_state);
  }
}
