import { beforeEach, describe, expect, it, vi } from "vitest";
import GameLifeCycle from "../useCase/GameLifeCycle";
import type IPromptNickName from "../port/IPromptNickName";

describe("GameLifeCycle", () => {
  let gameLifeCycle: GameLifeCycle;
  let ui_mock = { prompt_nick_name: vi.fn() } as IPromptNickName;

  beforeEach(() => {
    gameLifeCycle = new GameLifeCycle(ui_mock as any);
  });

  it("should init local/remote player and playerAgent", () => {
    gameLifeCycle.on_boot(ui_mock as any);
    expect(gameLifeCycle.playerAgent).toBeTruthy();
    expect(gameLifeCycle.localPlayer).toBeTruthy();
    expect(gameLifeCycle.remotePlayer).toBeTruthy();
  });
});
