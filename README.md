# ts-signify

ts-signify is a TypeScript implementation of OpenBSD's
[signify(1)](https://man.openbsd.org/signify).

## Dependencies

- Node.js 16.x
- Yarn

## Building

    yarn install
    yarn build

## API

### Class: `KeyPair`

#### Static method: `KeyPair.import(pubKeyStr, secKeyStr)`

- pubKeyStr `<string>` The `string` representation of a public key.
- secKeyStr `<string>` The `string` representation of a secret key.
- Returns: `<KeyPair>` A key pair.

Imports a key pair.

#### Static method: `KeyPair.generate(passphrase)`

- passphrase `<string>` The passphrase to protect the secret key with.
- Returns: `<KeyPair>` A key pair.

Generates a key pair.

### Class: `PublicKey`

#### Static method: `PublicKey.import(pubKeyStr)`

- pubKeyStr `<string>` The `string` representation of a public key.
- Returns: `<string>` A public key.

Imports a public key.

#### `keyPair.export()`

- Returns: `<string>` The `string` representation of the public key.

Exports the public key.

### Class: `SecretKey`

#### Static method: `KeyPair.import(secKeyStr)`

- secKeyStr `<string>` The `string` representation of a secret key.
- Returns: `<string>` A secret key.

Imports a secret key.

#### `keyPair.export()`

- Returns: `<string>` The `string` representation of the secret key.

Exports the secret key.

#### `keyPair.decrypt(passphrase)`

- passphrase `<string>` The passphrase to decrypt the key with.
- Returns: `<UnencryptedSecretKey>` An unencrypted secret key.

Decrypts the secret key. Returns `null` if an incorrect passphrase is given.

### Class: `UnencryptedSecretKey`

- Extends: `<SecretKey>`

### Class: `Signature`

#### Static method: `Signature.import(sigStr)`

- sigStr `<string>` The `string` representation of a signature.
- Returns: `<Signature>` A signature.

Imports a signature.

#### `signature.export()`

- Returns: `<string>` The `string` representation of the signature.

Exports the signature.

### `sign(data, secretKey[, comment])`

- data `<string | Uint8Array>` The data to be signed.
- secretKey `<UnencryptedSecretKey>` The secret key to sign the data with.
- comment `<string>` The "untrusted comment" section of the signature.
  **Default: `""`**
- Returns: `<Signature>` A signature.

Signs the data with the given secret key.

### `verify(data, signature, publicKey)`

- data `<string | Uint8Array>` The signed data.
- signature `<Signature>` The signature to be verified.
- publicKey `<PublicKey>` The public key that corresponds to the signature.
- Returns: `<boolean>` The verification result.

Verifies the signature with the given public key.

## Author

- Hiroki Okada <hirokio@tutanota.com>

## License

See [LICENSE](LICENSE).
