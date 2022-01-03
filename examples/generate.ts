import { generate } from "../src";

let keyPair = generate({
  passphrase: "passphrase",
});

console.log(keyPair);
