import { it, describe, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/svelte";
import MainGame from "../svelteAdapter/MainGame.svelte";
import type DeprecatedKingzPlayAdapter from "../useCase/DeprecatedKingzPlayAdapter";
import type KingzInit from "../useCase/KingzInit";
import type GameLifeCycle from "../useCase/GameLifeCycle";
import { readable } from "svelte/store";

describe("MainGame svelte view layer", () => {
  beforeEach(() => {
    render(MainGame, {
      props: {
        GameCells: readable([]),
        PlayUseCase: {} as DeprecatedKingzPlayAdapter,
        InitUseCase: {} as KingzInit,
        gameLifeCycle: {} as GameLifeCycle,
      },
    });
  });

  it("should have a title card", () => {
    expect(screen.getByText(/Hello, Kingz/)).toBeTruthy();
  });
});
