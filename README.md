# node-signify

node-signify is a Node.js port of OpenBSD's
[signify(1)](https://man.openbsd.org/signify) written in TypeScript. It provides
API for generating a key pair, signing a message with as well as verifying a
signature.

This module has no dependency on Node.js built-in modules and doesn't require a
polyfill to run in a browser.

## Usage

Full example code is available under the [`/test`](/test) directory.

### Generate a key pair

```ts
import { generateKeyPair } from "node-signify";

let keyPair = generateKeyPair({
  passphrase: "passphrase", // optional
}); // => { privateKey: "...", publicKey: "..." }
```

### Sign a message

```ts
import { sign } from "node-signify";

let signature = sign({
  comment: "verify with mock-key.pub",
  message: "[mock message]" + "\n",
  passphrase: "passphrase",
  privateKey: "...",
}); // => "untrusted comment: ..."
```

### Verify a signature

```ts
import { verify } from "node-signify";

let verified = verify({
  message: "[mock message]" + "\n",
  publicKey: "...",
  signature: "...",
}); // => boolean
```

## API

### generateKeyPair({ passphrase? }): KeyPair

Generates a key pair. Returns a `KeyPair` object that has `privateKey` and
`publicKey` members.

### sign({ comment, message, passphrase, privateKey }): string

Signs the message using the private key and returns a signature.

### verify({ message, publicKey, signature }): boolean

Verifies the signature for the message and returns `true` if verification
succeeded and `false` if it failed.

## Contributions

Contributions are welcome. Submit a pull request on GitHub or
[send a patch](https://www.git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_project_over_email)
to hirokio@tutanota.com.

## License

See [LICENSE](LICENSE).
