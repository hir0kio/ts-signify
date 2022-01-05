import { generateKeyPair } from "../src";

let keyPair = generateKeyPair({
  passphrase: "passphrase",
});

console.log(keyPair.privateKey);
console.log(keyPair.publicKey);
