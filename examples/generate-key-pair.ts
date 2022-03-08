import { KeyPair } from "../src/main";

// The passphrase to protect the secret key with.
let passphrase = "passphrase";

// Generate a key pair with the passphrase.
let keyPair = KeyPair.generate(passphrase);

// Show the public key.
console.log(keyPair.publicKey.export());

// Show the secret key.
console.log(keyPair.secretKey.export());
