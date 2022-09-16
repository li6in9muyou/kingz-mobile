import type { KingzGameState } from "../domain/KingzGame";
import type IUpdateView from "../port/IUpdateView";
import type IPromptNickName from "../port/IPromptNickName";
import debug from "debug";
import type GameLifeCycle from "./GameLifeCycle";
import { HttpClient } from "./Infrastructure";

const print = debug("LocalPlayer");

export default class LocalPlayer {
  static DefaultUser = "Guest";

  private ui: IUpdateView & IPromptNickName;
  private CurrentUser: string;

  constructor(
    ui: IUpdateView & IPromptNickName,
    private readonly game: GameLifeCycle
  ) {
    this.ui = ui;
    this.ui.prompt_nick_name();
  }

  on_register(nickname: string) {
    this.CurrentUser = nickname;
    print(`on_register, nickname ${nickname}`);
    HttpClient.do_fetch(700, { nickname }).then(() => {
      this.game.on_game_start();
    });
  }

  on_log_out() {
    this.CurrentUser = LocalPlayer.DefaultUser;
  }

  get_nickname(): string {
    return this.CurrentUser ?? LocalPlayer.DefaultUser;
  }

  push_game_state(game_state: KingzGameState) {
    this.ui.update_view(game_state);
  }
}