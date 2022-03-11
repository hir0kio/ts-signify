## 0.5.1

- Allow comment to be changed after creation.

## 0.5.0

- The public API has been rewritten from scratch with a new design.

## 0.4.0

- Replace all instances of "private key" with "secret key".

## 0.3.2

- Rename the project to ts-signify.
- Remove usage of Node.js built-in modules.
- Rename the `DecryptPrivateKeyOptions` interface to
  `PrivateKeyDecryptionOptions`.

## 0.3.1

- The 'untrusted comment' section of a generated secret key is now the same as
  the reference implementation.

## 0.3.0

- Rename the `GenerationOptions` interface to `KeyPairGenerationOptions`.

## 0.2.2

- Rename the `generate()` function to `generateKeyPair()`.

## 0.2.1

- Rename the `GenerateOptions` interface to `GenerationOptions`.
- Rename the `SignOptions` interface to `SigningOptions`.
- Rename the `VerifyOptions` interface to `VerificationOptions`.
- Fix the TypeScript compiler configuration to include type declaration files to
  the compilation.

## 0.2.0

- Remove the `Container` interface.
- Move the `comment` property to `PrivateKey`, `PublicKey` and `Signature`
  interfaces.

## 0.1.0

Initial release.
