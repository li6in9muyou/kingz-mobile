import { Troop } from "./Troop";
import { Terrain } from "./Terrain";
import { GRID_DIM, GRID_SIZE } from "../GameConfig";
import { GameCells } from "./GameState";

export function spawnTroops(cells) {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].isHome) {
      cells[i].troop = Troop.buildMine(10);
    } else if (cells[i].isEnemyHome) {
      cells[i].troop = Troop.buildEnemy(10);
    }
  }
  return cells;
}

export function spawnTerrain(totalCellCnt) {
  const gridDim = Math.sqrt(totalCellCnt);
  const blank = Array(totalCellCnt);

  for (let i = 0; i < totalCellCnt; i++) {
    blank[i] = Terrain.buildPlain();
  }

  const HOME_BASE_CNT = 1;
  let MOUNTAIN_CNT = gridDim % 2 === 0 ? gridDim : gridDim + 1;
  let FORTRESS_CNT = (gridDim % 2 === 0 ? gridDim : gridDim + 1) / 4 + 1;
  if (MOUNTAIN_CNT * 2 + FORTRESS_CNT * 2 + HOME_BASE_CNT * 2 > totalCellCnt) {
    console.log("special terrain count exceeds total cell count");
    MOUNTAIN_CNT = 1;
    FORTRESS_CNT = 1;
  }
  console.log(
    `spawing ${HOME_BASE_CNT * 2} homebase, ${MOUNTAIN_CNT} mountains, ${
      FORTRESS_CNT * 2
    } fortress`
  );

  for (let i = 0; i < HOME_BASE_CNT; i++) {
    let current, currentMirror;
    do {
      const r = Math.floor(GRID_DIM * Math.random());
      const c = Math.floor(GRID_DIM * Math.random());
      current = r * gridDim + c;
      currentMirror = (gridDim - 1 - r) * gridDim + gridDim - 1 - c;
    } while (current === currentMirror || !blank[current].isPlain);

    blank[current] = Terrain.buildHomeBase();
    blank[currentMirror] = Terrain.buildEnemyHomeBase();
  }

  for (let i = 0; i < FORTRESS_CNT; i++) {
    let current, currentMirror;
    do {
      const r = Math.floor(GRID_DIM * Math.random());
      const c = Math.floor(GRID_DIM * Math.random());
      current = r * gridDim + c;
      currentMirror = (gridDim - 1 - r) * gridDim + gridDim - 1 - c;
    } while (current === currentMirror || !blank[current].isPlain);

    const count = 40 + Math.floor(60 * Math.random());
    blank[current] = Terrain.buildFortress(count);
    blank[currentMirror] = Terrain.buildFortress(count);
  }

  for (let i = 0; i < MOUNTAIN_CNT; i++) {
    let current, currentMirror;
    do {
      const r = Math.floor(GRID_DIM * Math.random());
      const c = Math.floor(GRID_DIM * Math.random());
      current = r * gridDim + c;
      currentMirror = (gridDim - 1 - r) * gridDim + gridDim - 1 - c;
    } while (current === currentMirror || !blank[current].isPlain);

    blank[current] = Terrain.buildMountain();
    blank[currentMirror] = Terrain.buildMountain();
  }

  return blank;
}

export function gameInit() {
  let t = spawnTerrain(GRID_SIZE);
  t = spawnTroops(t);
  GameCells.set(t);
}
