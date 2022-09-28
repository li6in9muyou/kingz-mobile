import { it, describe, expect } from "vitest";
import StrongerOverTime from "../useCase/StrongerOverTime";

describe("StrongerOverTime", () => {
  it("should have a cool builder", () => {
    expect(new StrongerOverTime()).toBeTruthy();
  });
});
