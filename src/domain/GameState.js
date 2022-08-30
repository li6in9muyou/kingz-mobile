import { derived, writable } from "svelte/store";

export const GameState = writable({ cells: [] });

export const GameCells = derived(GameState, (s) => s.cells);
