## 0.5.0 (March 8, 2022)

- The public API has been rewritten from scratch with a new design.

## 0.4.0 (February 9, 2022)

- Replace all instances of "private key" with "secret key".

## 0.3.2 (February 7, 2022)

- Rename the project to ts-signify.
- Remove usage of Node.js built-in modules.
- Rename the `DecryptPrivateKeyOptions` interface to
  `PrivateKeyDecryptionOptions`.

## 0.3.1 (January 14, 2022)

- The 'untrusted comment' section of a generated secret key is now the same as
  the reference implementation.

## 0.3.0 (January 5, 2022)

- Rename the `GenerationOptions` interface to `KeyPairGenerationOptions`.

## 0.2.2 (January 4, 2022)

- Rename the `generate()` function to `generateKeyPair()`.

## 0.2.1 (January 3, 2022)

- Rename the `GenerateOptions` interface to `GenerationOptions`.
- Rename the `SignOptions` interface to `SigningOptions`.
- Rename the `VerifyOptions` interface to `VerificationOptions`.
- Fix the TypeScript compiler configuration to include type declaration files to
  the compilation.

## 0.2.0 (January 3, 2022)

- Remove the `Container` interface.
- Move the `comment` property to `PrivateKey`, `PublicKey` and `Signature`
  interfaces.

## 0.1.0 (January 3, 2022)

Initial release.
