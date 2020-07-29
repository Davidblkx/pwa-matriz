import { expect } from "chai";

import { SecurityService } from "@/services/security.service";

describe("Security service", () => {
  it("Hash using SHA3", () => {
    const subject = "BATATAS";
    const result = SecurityService.hash(subject);
    const target =
      "zDHsYYrfHzbI+5kNvD7vLqn00q9TGjZNqTjZSnL19Xax+lZHc3jv" +
      "KztRTsWAooKxi4QXUgpbAsCkX2Xhp66AnQ==";
    expect(result).equal(target);
  });

  it("Encrypt using rabbit", () => {
    const subject = "BATATAS";
    const pass = SecurityService.hash("MY_SUPER_PASS");
    const encryptRes = SecurityService.encrypt(subject, pass);
    expect(encryptRes).not.equal("", "is not empty");
    const res = SecurityService.decrypt(encryptRes, pass);
    expect(res).equal(subject);
  });
});
