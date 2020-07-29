import { expect } from "chai";

import { StorageService } from "@/services/storage.service";

interface Person {
  name: string;
  age: number;
}

function isPerson(e: unknown): e is Person {
  return (
    typeof e !== "undefined" &&
    e !== null &&
    typeof e === "object" &&
    typeof (e as Person).name === "string" &&
    typeof (e as Person).age === "number"
  );
}

const subject: Person = {
  name: "Batatas",
  age: 30
};

describe("Security service", () => {
  it("Save and get plain objects", () => {
    const key = "MY_KEY_PLAIN";
    const service = StorageService.create();
    service.set(key, subject);
    const target = service.get(key, isPerson);

    expect(target.hasValue()).true;
    expect(target.get().name).equal(subject.name);
    expect(target.get().age).equal(subject.age);
  });
  it("Save and get encrypt objects", () => {
    const key = "MY_KEY_ENCRYPT";
    const pass = "MY_PASS_PHRASE";
    const service = StorageService.create();
    service.setEncrypted(key, pass, subject);
    const target = service.getEncrypted(key, pass, isPerson);

    expect(target.hasValue()).true;
    expect(target.get().name).equal(subject.name);
    expect(target.get().age).equal(subject.age);
  });
  it("Return empty optional on invalid key", () => {
    const service = StorageService.create();
    const target1 = service.get("INVALID");
    const target2 = service.getEncrypted("INVALID", "INVALID");

    expect(target1.hasValue()).false;
    expect(target2.hasValue()).false;
  });
});
