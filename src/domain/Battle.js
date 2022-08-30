export function battle(from, to, count) {
  if (count > from.troopCount) {
    throw {
      type: "invalid parameters",
      cause: "moving more troop than you have",
    };
  }

  if (from.troopOwner === to.troopOwner) {
    from.troopCount -= count;
    to.troopCount += count;
  } else {
    if (count > to.troopCount) {
      to.troopOwner = from.troopOwner;
    }

    from.troopCount -= count;
    to.troopCount -= count;
    to.troopCount = Math.abs(to.troopCount);

    if (count === to.troopCount) {
      from.troopCount = 0;
      from.troopOwner = "none";
      to.troopCount = 0;
      to.troopOwner = "none";
    }
  }
}
