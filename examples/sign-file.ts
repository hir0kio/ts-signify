import { readFile } from "fs";
import { resolve } from "path";
import { promisify } from "util";
import { parsePrivateKey, sign } from "../src";

(async () => {
  let signature = sign({
    privateKey: parsePrivateKey(
      await promisify(readFile)(resolve(process.cwd(), "mocks", "mock-key.sec"))
    )!,
    message: await promisify(readFile)(
      resolve(process.cwd(), "mocks", "mock-message")
    ),
    passphrase: "passphrase",
    comment: "verify with mock-key.pub",
  });

  console.log(signature);
})();
