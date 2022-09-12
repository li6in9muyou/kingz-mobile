export class Troop {
  troopCount: number;
  troopOwner: "blue" | "red" | "neu";

  constructor(troopCount, troopOwner) {
    this.troopCount = troopCount;
    this.troopOwner = troopOwner;
  }

  get isMine() {
    return this.troopOwner === "blue";
  }

  get isEnemy() {
    return this.troopOwner === "red";
  }

  get isNeutral() {
    return this.troopOwner === "neu";
  }

  static buildNeutral(n) {
    return new Troop(n, "neu");
  }

  static buildEnemy(n) {
    return new Troop(n, "red");
  }

  static buildMine(n) {
    return new Troop(n, "blue");
  }
}
