import type IRemotePort from "../IRemotePort";
import type { KingzPlayerMove } from "../../domain/KingzGame";

export default abstract class BaseRemotePort implements IRemotePort {
  protected receive_remote_handler: any;
  protected remote_disconnected_handler: any;

  on_receive_remote_move(callback: (move: KingzPlayerMove) => void) {
    this.receive_remote_handler = callback;
  }

  on_remote_disconnected(callback: (why: string) => void) {
    this.remote_disconnected_handler = callback;
  }

  abstract send(move: KingzPlayerMove);
}
