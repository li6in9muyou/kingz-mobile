import { describe, expect, it, vi } from "vitest";
import RemotePlayer from "../useCase/RemotePlayer";
import FakeByConsole from "../port/RemotePort/FakeByConsole";
import type PlayerAgent from "../useCase/PlayerAgent";

describe("RemotePlayer", () => {
  it("should forward moves to PlayerAgent", () => {
    const on_submit_command = vi.fn();
    new RemotePlayer(
      { on_submit_command } as unknown as PlayerAgent,
      new FakeByConsole()
    );
    window.mock_remote.move(99, "up", 2);
    expect(on_submit_command).toBeCalledWith({
      cellIdx: 99,
      dir: "up",
      troopCount: 2,
    });
  });
});
