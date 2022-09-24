import type { KingzGameState } from "../domain/KingzGame";
import type IUpdateView from "../port/IUpdateView";
import type IPromptNickName from "../port/IPromptNickName";
import debug from "debug";
import { HttpClient } from "./Infrastructure";

const print = debug("LocalIdentity");

export default class LocalIdentity {
  static DefaultUser = "Guest";

  private ui: IUpdateView & IPromptNickName;
  // TODO: push this attribute to view layer
  private CurrentUser: string;
  private gather_info_done: (unknown) => void;

  constructor(ui: IUpdateView & IPromptNickName) {
    this.ui = ui;
  }

  async gather_information() {
    this.ui.prompt_nick_name();
    return new Promise((resolve) => {
      this.gather_info_done = resolve;
    });
  }

  on_register(nickname: string) {
    // TODO: make actual http requests
    this.CurrentUser = nickname;
    print(`on_register, nickname ${nickname}`);
    HttpClient.do_fetch(700, { nickname }).then(() => {
      this.gather_info_done(this.get_nickname());
    });
  }

  on_log_out() {
    // TODO: make actual http requests
    this.CurrentUser = LocalIdentity.DefaultUser;
  }

  get_nickname(): string {
    return this.CurrentUser ?? LocalIdentity.DefaultUser;
  }

  push_game_state(game_state: KingzGameState) {
    this.ui.update_view(game_state);
  }
}
