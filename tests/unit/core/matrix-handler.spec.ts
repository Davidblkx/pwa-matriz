import { expect } from "chai";

import { MatrixHandler } from "@/core/matrix-handler";

describe("Matrix handler", () => {
  it("Test matix set get coordinates", () => {
    const handler = new MatrixHandler(3);

    handler.setCoordinate("A", 1, "123");
    handler.setCoordinate("A", 2, "456");
    handler.setCoordinate("A", 3, "789");
    handler.setCoordinate("B", 1, "123");
    handler.setCoordinate("B", 2, "456");
    handler.setCoordinate("B", 3, "789");

    const test1 = handler.getCoordinateValue("A", 1, 1);
    expect(test1).equal("1");

    const test2 = handler.getCoordinateValue("A", 2, 3);
    expect(test2).equal("6");

    const test3 = handler.getCoordinateValue("A", 3, 2);
    expect(test3).equal("8");

    const test4 = handler.getCoordinateValue("B", 1, 1);
    expect(test4).equal("1");

    const test5 = handler.getCoordinateValue("B", 2, 3);
    expect(test5).equal("6");

    const test6 = handler.getCoordinateValue("B", 3, 2);
    expect(test6).equal("8");
  });
});
