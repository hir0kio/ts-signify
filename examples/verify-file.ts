import { readFile } from "fs";
import { resolve } from "path";
import { promisify } from "util";
import { verify } from "../src";

(async () => {
  let verified = verify({
    signature: await promisify(readFile)(
      resolve(process.cwd(), "mocks", "mock-message.sig")
    ),
    message: await promisify(readFile)(
      resolve(process.cwd(), "mocks", "mock-message")
    ),
    publicKey: await promisify(readFile)(
      resolve(process.cwd(), "mocks", "mock-key.pub")
    ),
  });

  console.log(
    `ts-signify: ${
      verified ? "Signature verified" : "Signature verification failed"
    }`
  );
})();
