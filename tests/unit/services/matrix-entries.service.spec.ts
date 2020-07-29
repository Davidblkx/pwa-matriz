import { expect } from "chai";

import { MatrixEntry } from "@/models/matrix-entry.model";
import { MatrixEntriesService } from "@/services/matrix-entries.service";

describe("Matrix entries", () => {
  it("Save and get matrix objects", () => {
    const service = MatrixEntriesService.instance();
    const subject: MatrixEntry = {
      name: "BATATAS",
      signature: "MY_SIGNATURE"
    };

    const resAdd = service.add(subject);
    expect(resAdd).true;

    const resAddDuplicate = service.add(subject);
    expect(resAddDuplicate).false;

    const hasMatrix = service.has(subject.name);
    expect(hasMatrix).true;

    const count = service.getAll().length;
    expect(count).equal(1);

    const target = service.get(subject.name);
    expect(target.get().name).equal(subject.name);
    expect(target.get().signature).equal(subject.signature);

    const invalid = service.get("");
    expect(invalid.hasValue()).false;

    service.remove(subject.name);
    const count2 = service.getAll().length;
    expect(count2).equal(0);
  });
  it("Service is singleton", () => {
    const service = MatrixEntriesService.instance();
    const subject: MatrixEntry = {
      name: "BATATAS",
      signature: "MY_SIGNATURE"
    };

    const resAdd = service.add(subject);
    expect(resAdd).true;

    const service2 = MatrixEntriesService.instance();
    const target = service2.get(subject.name);
    expect(target.get().name).equal(subject.name);
    expect(target.get().signature).equal(subject.signature);
  });
});
