import { generateKeyPair } from "../src";

let keyPair = generateKeyPair({
  passphrase: "passphrase",
});

console.log(keyPair.publicKey);
console.log(keyPair.secretKey);
