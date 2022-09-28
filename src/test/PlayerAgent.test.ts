import { beforeEach, describe, expect, it, vi } from "vitest";
import PlayerAgent from "../useCase/PlayerAgent";
import GameLifeCycle from "../useCase/GameLifeCycle";
import type KingzGame from "../domain/KingzGame";
import { findIndex } from "lodash";
import type IPromptNickName from "../port/IPromptNickName";
import type IUpdateView from "../port/IUpdateView";

describe("PlayerAgent", () => {
  let kingzGame: KingzGame;
  let gameLifeCycle: GameLifeCycle;
  let playerAgent: PlayerAgent;
  let ui_mock = {
    prompt_nick_name: vi.fn(),
    update_view: vi.fn(),
  } as IPromptNickName & IUpdateView;

  beforeEach(() => {
    gameLifeCycle = new GameLifeCycle(ui_mock as any);
    gameLifeCycle.on_boot(ui_mock as any);
    kingzGame = gameLifeCycle.game;
    playerAgent = new PlayerAgent(kingzGame, gameLifeCycle);
  });

  it("should alter game state", () => {
    const mine = findIndex(kingzGame.game_cells, (t) => t.troop?.isMine);
    const orig_count = kingzGame.game_cells[mine].troop.troopCount;
    playerAgent.on_submit_command({ cellIdx: mine, dir: "up", troopCount: 3 });

    expect(kingzGame.game_cells[mine].troop.troopCount).toEqual(orig_count - 3);
  });

  it("should update game state until both players have moved", () => {
    const mine = findIndex(kingzGame.game_cells, (t) => t.troop?.isMine);
    const opp = findIndex(kingzGame.game_cells, (t) => t.troop?.isEnemy);

    expect(ui_mock.update_view).toBeCalledTimes(0);
    playerAgent.on_submit_command({ cellIdx: mine, dir: "up", troopCount: 3 });
    expect(ui_mock.update_view).toBeCalledTimes(0);
    playerAgent.on_submit_command({ cellIdx: opp, dir: "down", troopCount: 3 });
    expect(ui_mock.update_view).toHaveBeenCalledOnce();
  });
});
