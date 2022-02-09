import { sign } from "../src";

let signature = sign({
  comment: "verify with mock-key.pub",
  message: "[mock message]" + "\n",
  passphrase: "passphrase",
  secretKey:
    "untrusted comment: signify secret key" +
    "\n" +
    "RWRCSwAAACqJ7f6/CH4FzXB6RaJukrszI6KSOAMlKOpYneRdupGjVdodIBB5HFJ+" +
    "3oAby9p+8olmK90Ltjyb7VTgvwU7eCqdCqYGBizi4EqGY3uj5n723F4bYhYcAjSx" +
    "yy7KLRVbwLE=" +
    "\n",
});

console.log(signature);
