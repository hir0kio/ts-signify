import { readFile } from "fs";
import { resolve } from "path";
import { promisify } from "util";
import { sign } from "../src";

(async () => {
  let signature = sign({
    comment: "verify with mock-key.pub",
    message: await promisify(readFile)(
      resolve(process.cwd(), "mocks", "mock-message")
    ),
    passphrase: "passphrase",
    secretKey: await promisify(readFile)(
      resolve(process.cwd(), "mocks", "mock-key.sec")
    ),
  });

  console.log(signature);
})();
