import { HttpClient } from "./Infrastructure";

export default class OnlineRegister {
  http_client = HttpClient;
  private nickname: string;
  private game;

  constructor(game) {
    this.game = game;
  }

  get_current_user(): string {
    return this.nickname ?? "Guest";
  }

  register(nickname: string) {
    this.http_client.do_fetch().then(() => {
      this.nickname = nickname;
      this.game.boot();
    });
  }
}
