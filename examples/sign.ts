import { SecretKey, sign } from "../src/main";

// Import the secret key and decrypt it.
let secretKey = SecretKey.import(
  "untrusted comment: signify secret key\n" +
    "RWRCSwAAACqJ7f6/CH4FzXB6RaJukrszI6KSOAMlKOpYneRdupGjVdodIBB5HFJ+3oAby9p+8olmK90Ltjyb7VTgvwU7eCqdCqYGBizi4EqGY3uj5n723F4bYhYcAjSxyy7KLRVbwLE=\n"
).decrypt("passphrase");

// The data to be signed.
let data = "data";

// The "untrusted comment" section of the signature that we will create.
let comment = "verify with key.pub";

// Sign the data.
let signature = sign(data, secretKey!, comment);

// Show the signature.
console.log(signature.export());
