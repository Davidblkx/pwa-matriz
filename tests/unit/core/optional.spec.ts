import { expect } from "chai";

import { Optional } from "@/core/optional";

function validator<T>(e: unknown): e is T {
  return typeof e === "object";
}

describe("Optional tests", () => {
  it("return false on null or undefined or invalid object", () => {
    expect(Optional.some(undefined).hasValue()).false;
    expect(Optional.some(null).hasValue()).false;
    expect(Optional.none().hasValue()).false;
    const target = Optional.some(undefined, validator).hasValue();
    expect(target, "using custom validator").false;
  });
  it("return true on not null or undefined or invalid object", () => {
    expect(Optional.some({}).hasValue()).true;
    expect(Optional.some({}, validator).hasValue()).true;
  });
  it("throw on undefined", () => {
    try {
      Optional.none().get();
      expect(false).true;
    } catch {
      expect(true).true;
    }
  });
});
