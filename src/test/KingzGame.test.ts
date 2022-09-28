import { beforeEach, describe, expect, it } from "vitest";
import KingzGame from "../domain/KingzGame";
import KingzInit from "../useCase/KingzInit";
import LiteralGameConfig from "../port/LiteralGameConfig/LiteralGameConfig";
import { findIndex } from "lodash";

describe("KingzGame", () => {
  let kingzGame: KingzGame;

  beforeEach(() => {
    kingzGame = new KingzGame();
    kingzGame.init_with_this_game_state({
      cells: new KingzInit(new LiteralGameConfig()).gen_init_cells(),
      round_idx: 0,
      executed_moves: [],
    });
  });

  it("should have 100 cells", () => {
    expect(kingzGame.game_cells.length).toEqual(100);
  });

  it("should have two homebases", () => {
    const kingzGame = new KingzGame();
    kingzGame.init_with_this_game_state({
      cells: new KingzInit(new LiteralGameConfig()).gen_init_cells(),
      round_idx: 0,
      executed_moves: [],
    });
    expect(findIndex(kingzGame.game_cells, (t) => t.troop?.isEnemy)).to.within(
      0,
      99
    );
    expect(findIndex(kingzGame.game_cells, (t) => t.troop?.isMine)).to.within(
      0,
      99
    );
  });
});
