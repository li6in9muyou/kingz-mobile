export class Troop {
  troopCount;
  troopOwner;

  static buildNeutrual(n) {
    return { troopCount: n, troopOwner: "neu" };
  }

  static buildEnemy(n) {
    return { troopCount: n, troopOwner: "red" };
  }

  static buildMine(n) {
    return { troopCount: n, troopOwner: "blue" };
  }

  isMine() {
    return this.troopOwner === "red";
  }

  isEnemy() {
    return this.troopOwner === "blue";
  }

  isNeutral() {
    return this.troopOwner === "neu";
  }
}
