import { readFile } from "fs";
import { resolve } from "path";
import { promisify } from "util";
import { parsePublicKey, parseSignature, verify } from "../src";

(async () => {
  let verified = verify({
    signature: parseSignature(
      await promisify(readFile)(
        resolve(process.cwd(), "mocks", "mock-message.sig")
      )
    )!.content,
    message: await promisify(readFile)(
      resolve(process.cwd(), "mocks", "mock-invalid-message")
    ),
    publicKey: parsePublicKey(
      await promisify(readFile)(resolve(process.cwd(), "mocks", "mock-key.pub"))
    )!.content,
  });

  console.log(
    `node-signify: ${
      verified ? "Signature verified" : "Signature verification failed"
    }`
  );
})();
