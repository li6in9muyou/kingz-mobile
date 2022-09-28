import type { KingzPlayerMove } from "../domain/KingzGame";

export default interface IRemotePort {
  send(move: KingzPlayerMove);
  on_receive_remote_move(callback: (move: KingzPlayerMove) => void);
  on_remote_disconnected(callback: (why: string) => void);
}
