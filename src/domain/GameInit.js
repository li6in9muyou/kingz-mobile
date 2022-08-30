import { Troop } from "./Troop";

export function spawnTroops(totalCellCnt) {
  const gridDim = Math.sqrt(totalCellCnt);
  const blank = Array(totalCellCnt);

  for (let r = 0; r < gridDim; r += 1) {
    for (let c = 0; c <= r; c += 1) {
      const isMine = Math.random() > 0.5;
      const count = 5 + Math.floor(20 * Math.random());
      const current = r * gridDim + c;
      const currentMirror = (gridDim - 1 - r) * gridDim + gridDim - 1 - c;

      if (current === currentMirror) {
        blank[current] = Troop.buildNeutral(0);
      } else {
        blank[current] = isMine
          ? Troop.buildMine(count)
          : Troop.buildEnemy(count);
        blank[currentMirror] = !isMine
          ? Troop.buildMine(count)
          : Troop.buildEnemy(count);
      }
    }
  }
  console.log(blank);
  return blank;
}
