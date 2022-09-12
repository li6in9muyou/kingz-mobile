import { writable } from "svelte/store";
import { Troop } from "./Troop";

export const GameTerrain = writable([]);

export class Terrain {
  type;
  troop;
  occupied_since = 0;

  constructor(type, troop) {
    this.type = type;
    this.troop = troop;
  }

  get isHome() {
    return "home" === this.type;
  }

  get isMountain() {
    return "mountain" === this.type;
  }

  get isEnemyHome() {
    return "enemy_home" === this.type;
  }

  get isPlain() {
    return "plain" === this.type;
  }

  get isFortress() {
    return "fortress" === this.type;
  }

  static buildPlain() {
    return new Terrain("plain", null);
  }

  static buildMountain() {
    return new Terrain("mountain", null);
  }

  static buildHomeBase(n = 10) {
    return new Terrain("home", Troop.buildMine(n));
  }

  static buildEnemyHomeBase(n = 10) {
    return new Terrain("enemy_home", Troop.buildEnemy(n));
  }

  static buildFortress(n) {
    return new Terrain("fortress", Troop.buildNeutral(n));
  }
}
