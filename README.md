# ts-signify

ts-signify is a TypeScript implementation of OpenBSD's
[signify(1)](https://man.openbsd.org/signify).

## Dependencies

- Node.js 16.14.0
- npm 8.3.1
- pnpm
- NPM modules
  - [base64-js](https://www.npmjs.com/package/base64-js)
  - [bcrypt-pbkdf](https://www.npmjs.com/package/bcrypt-pbkdf)
  - [buffer](https://www.npmjs.com/package/buffer)
  - [ieee754](https://www.npmjs.com/package/ieee754)
  - [tweetnacl](https://www.npmjs.com/package/tweetnacl)

## Installation

    git clone https://github.com/okada-h/ts-signify
    cd ts-signify
    npm install -g pnpm
    pnpm install

## Building

    pnpm build

## Testing

    pnpm test

## Usage

Full example code is available under the [`/test`](/test) directory.

### Key pair generation

```ts
import { generateKeyPair } from "ts-signify";

let keyPair = generateKeyPair({
  passphrase: "passphrase",
});

console.log(keyPair.publicKey);
console.log(keyPair.secretKey);
```

### Signing

```ts
import { sign } from "ts-signify";

let signature = sign({
  comment: "verify with mock-key.pub",
  message: "...",
  passphrase: "passphrase",
  secretKey: "...",
});
```

### Signature verification

```ts
import { verify } from "ts-signify";

let verified = verify({
  message: "...",
  publicKey: "...",
  signature: "...",
});
```

## API

### `generateKeyPair({[ passphrase ]})`

- passphrase `<string>` The passphrase to protect the secret key with.
- Returns: `<KeyPair>` A key pair.

Generates a key pair. If `passphrase` is not given, the produced secret key will
be in plaintext.

### `sign({ comment, message, secretKey[, passphrase]})`

- comment `<Buffer>` | `<string>` The comment section of the signature.
- message `<Buffer>` | `<string>` The message to be signed.
- secretKey `<Buffer>` | `<string>` The secret key to sign the message.
- passphrase `<string>` The passphrase to retrieve the secret key with.
- Returns: `<string>` | `<null>` A signature.

Signs the message with the given secret key. Returns `null` if incorrect
passphrase is given.

### `verify({ message, publicKey, signature })`

- message `<Buffer>` | `<string>` The message to be verified.
- publicKey `<Buffer>` | `<string>` The public key that was used to sign the
  message.
- signature `<Buffer>` | `<string>` The signature to be verified.
- Returns: `<boolean>`

Verifies the signature with the corresponding public key.

## Author

- Hiroki Okada <hirokio@tutanota.com>

## License

See [LICENSE](LICENSE).
