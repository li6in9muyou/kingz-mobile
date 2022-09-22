import type { KingzPlayerMove } from "../domain/KingzGame";

export default class RemotePlayer {
  move: Promise<KingzPlayerMove>;
  received_remote_move: (KingzPlayerMove) => void;

  constructor() {
    this.move = new Promise((resolve) => {
      this.received_remote_move = resolve;
    });
    const t = this;
    window.mock_remote = {
      move(cellIdx, direction, count) {
        t.received_remote_move({ cellIdx, dir: direction, troopCount: count });
      },
    };
  }

  subscribe(subscriber) {
    this.move.then(subscriber).then(() => {
      this.move = new Promise((resolve) => {
        this.received_remote_move = resolve;
      });
    });
  }
}
