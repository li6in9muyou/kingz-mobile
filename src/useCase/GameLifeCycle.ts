import KingzInit from "./KingzInit";
import LiteralGameConfig from "../port/LiteralGameConfig/LiteralGameConfig";
import KingzGame from "../domain/KingzGame";
import type IEndGame from "../port/IEndGame";
import LocalIdentity from "./LocalIdentity";
import type IUpdateView from "../port/IUpdateView";
import type IPromptNickName from "../port/IPromptNickName";
import RemotePlayer from "./RemotePlayer";
import type IStartGame from "../port/IStartGame";
import debug from "debug";
import PlayerAgent from "./PlayerAgent";
import ByWebSocket from "../port/RemotePort/ByWebSocket";
const print = debug("GameLifeCycle");

export default class GameLifeCycle {
  localPlayer: LocalIdentity;
  remotePlayer: RemotePlayer;
  playerAgent: PlayerAgent;
  game: KingzGame;

  constructor(private readonly ui: IEndGame & IStartGame & IUpdateView) {}

  async on_boot(ui: IUpdateView & IPromptNickName) {
    // create game
    this.game = new KingzGame();
    this.game.init_with_this_game_state({
      cells: new KingzInit(new LiteralGameConfig()).gen_init_cells(),
      round_idx: 0,
      executed_moves: [],
    });
    // create player agent
    this.playerAgent = new PlayerAgent(this.game, this);
    // create remote player
    this.remotePlayer = new RemotePlayer(this.playerAgent, new ByWebSocket());
    // create local player
    this.localPlayer = new LocalIdentity(ui);
    await this.localPlayer.gather_information();
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
    // TODO: save game to localStorage
    // TODO: request cloud to store current game
    print("local player wish to save current game");
  }

  on_one_turn_ended() {
    print("one turn has ended");
    this.game.start_next_round();
    this.ui.update_view(this.game.game_state);
  }

  on_command_submitted() {
    if (!this.game.can_continue()) {
      this.on_game_ended();
    } else {
      if (this.game.has_both_player_moved()) {
        this.on_one_turn_ended();
      }
    }
  }
}
