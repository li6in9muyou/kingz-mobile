import type PlayerAgent from "./PlayerAgent";

declare global {
  interface Window {
    mock_remote: { move: any };
  }
}

export default class RemotePlayer {
  constructor(private readonly playerAgent: PlayerAgent) {
    const t = this;
    window.mock_remote = {
      move(cellIdx, direction, count) {
        t.playerAgent.on_submit_command({
          cellIdx,
          dir: direction,
          troopCount: count,
        });
      },
    };
  }
}
