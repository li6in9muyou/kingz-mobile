import type PlayerAgent from "./PlayerAgent";
import type { KingzPlayerMove } from "../domain/KingzGame";
import type IRemotePort from "../port/IRemotePort";

export default class RemotePlayer {
  constructor(
    private readonly playerAgent: PlayerAgent,
    private readonly remotePort: IRemotePort
  ) {
    this.remotePort.on_remote_disconnected(
      this.remote_disconnected_handler.bind(this)
    );
    this.remotePort.on_receive_remote_move(
      this.receive_remote_move_handler.bind(this)
    );
  }
  receive_remote_move_handler(move: KingzPlayerMove) {
    this.playerAgent.on_submit_command(move);
  }
  remote_disconnected_handler(why: string) {
    console.error(`remote player disconnected, because ${why}`);
  }
}
