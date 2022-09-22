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

  async on_boot(ui: IUpdateView & IPromptNickName & IStartGame) {
    // create game
    this.game = new KingzGame(ui);
    this.game.init_with_this_game_state({
      cells: new KingzInit(new LiteralGameConfig()).gen_init_cells(),
      round_idx: 0,
      executed_moves: [],
    });
    // create local player
    this.localPlayer = new LocalPlayer(ui);
    await this.localPlayer.gather_information();
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

  on_local_quit() {
    print("local player wish to quit");
    this.on_game_ended();
  }

  on_local_save_game() {
    print("local player wish to save current game");
  }

  on_wait_remote_move() {
    this.remotePlayer.subscribe((m) => {
      this.game.execute_move(m);
    });
  }
}
