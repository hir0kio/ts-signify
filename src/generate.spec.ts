import { checkKeyPair, generate } from ".";

describe("generate()", () => {
  it("returns valid KeyPair object", async () => {
    let keyPair = await generate();

    expect(checkKeyPair(keyPair)).toBe(true);
  });
});
