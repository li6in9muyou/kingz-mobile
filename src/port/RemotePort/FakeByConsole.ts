import type { KingzPlayerMove } from "../../domain/KingzGame";
import BaseRemotePort from "./BaseRemotePort";

declare global {
  interface Window {
    mock_remote: { move: any };
  }
}

export default class FakeByConsole extends BaseRemotePort {
  constructor() {
    super();
    const get_cb = () => this.receive_remote_handler;
    window.mock_remote = {
      move: (cellIdx, direction, count) =>
        get_cb()({
          cellIdx,
          dir: direction,
          troopCount: count,
        }),
    };
  }

  send(move: KingzPlayerMove) {
    console.info(`sending ${JSON.stringify(arguments)} to fake remote...`);
  }
}
