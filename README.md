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

## API

### Class: `KeyPair`

Added in: v0.5.0

#### Static method: `KeyPair.import(pubKeyStr, secKeyStr)`

Added in: v0.5.0

- pubKeyStr `<string>` The `string` representation of a public key.
- secKeyStr `<string>` The `string` representation of a secret key.
- Returns: `<KeyPair>` A key pair.

Imports a key pair.

#### Static method: `KeyPair.generate(passphrase)`

Added in: v0.5.0

- passphrase `<string>` The passphrase to protect the secret key with.
- Returns: `<KeyPair>` A key pair.

Generates a key pair.

### Class: `PublicKey`

Added in: v0.5.0

#### Static method: `PublicKey.import(pubKeyStr)`

Added in: v0.5.0

- pubKeyStr `<string>` The `string` representation of a public key.
- Returns: `<string>` A public key.

Imports a public key.

#### `keyPair.export()`

Added in: v0.5.0

- Returns: `<string>` The `string` representation of the public key.

Exports the public key.

### Class: `SecretKey`

Added in: v0.5.0

#### Static method: `KeyPair.import(secKeyStr)`

Added in: v0.5.0

- secKeyStr `<string>` The `string` representation of a secret key.
- Returns: `<string>` A secret key.

Imports a secret key.

#### `keyPair.export()`

Added in: v0.5.0

- Returns: `<string>` The `string` representation of the secret key.

Exports the secret key.

#### `keyPair.decrypt()`

Added in: v0.5.0

- passphrase `<string>` The passphrase to decrypt the key with.
- Returns: `<UnencryptedSecretKey>` An unencrypted secret key.

Decrypts the secret key. Returns `null` if incorrect passphrase is given.

### Class: `UnencryptedSecretKey`

Added in: v0.5.0

- Extends: `<SecretKey>`

### Class: `Signature`

Added in: v0.5.0

#### Static method: `Signature.import(sigStr)`

- sigStr `<string>` The `string` representation of a signature.
- Returns: `<Signature>` A signature.

Imports a signature.

#### `signature.export()`

Added in: v0.5.0

- Returns: `<string>` The `string` representation of the signature.

Exports the signature.

### `sign(data, secretkey[, comment])`

Added in: v0.5.0

- data `<Uint8Array>` The data to be signed.
- secretKey `<UnencryptedSecretKey>` The secret key to sign the data with.
- comment `<string>` The "untrusted comment" section of the signature.
  **Default: `""`**
- Returns: `<Signature>` A signature.

Signs the data with the given secret key.

### `verify(data, signature, publicKey)`

Added in: v0.5.0

- data `<Uint8Array>` The signed data.
- signature `<Signature>` The signature to be verified.
- publicKey `<PublicKey>` The public key that corresponds to the signature.
- Returns: `<boolean>` The verification result.

Verifies the signature with the given public key.

## Author

- Hiroki Okada <hirokio@tutanota.com>

## License

See [LICENSE](LICENSE).
