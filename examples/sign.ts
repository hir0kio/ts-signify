import { parsePrivateKey, sign } from "../src";

let signature = sign({
  privateKey: parsePrivateKey(
    "untrusted comment: signify secret key" +
      "\n" +
      "RWRCSwAAACqJ7f6/CH4FzXB6RaJukrszI6KSOAMlKOpYneRdupGjVdodIBB5HFJ+3oAby9p+8olmK90Ltjyb7VTgvwU7eCqdCqYGBizi4EqGY3uj5n723F4bYhYcAjSxyy7KLRVbwLE=" +
      "\n"
  )!,
  message: "[mock message]" + "\n",
  passphrase: "passphrase",
  comment: "verify with mock-key.pub",
});

console.log(signature);
