import type { KingzPlayerMove } from "../../domain/KingzGame";
import BaseRemotePort from "./BaseRemotePort";

export default class ByWebSocket extends BaseRemotePort {
  send(move: KingzPlayerMove) {}
}
