import { pbkdf } from "bcrypt-pbkdf";
import { randomBytes, createHash } from "crypto";
import { MakeKeypair } from "ed25519";
import { KeyPair, stringifyPrivateKey, stringifyPublicKey, _num2buf } from ".";

const algorithm = "Ed",
  kdfAlgorithm = "BK",
  kdfRounds = 42;

export interface KeyPairGenerationOptions {
  passphrase?: string;
}

export function generateKeyPair(options?: KeyPairGenerationOptions): KeyPair {
  options = options ?? {};

  let keyNumber = randomBytes(8),
    keyPair = MakeKeypair(randomBytes(32)),
    salt = randomBytes(16),
    derivedPrivateKey = Buffer.alloc(64);

  if (options.passphrase) {
    pbkdf(
      Buffer.from(options.passphrase),
      Buffer.from(options.passphrase).length,
      salt,
      salt.length,
      derivedPrivateKey,
      derivedPrivateKey.length,
      kdfRounds
    );
  }

  return {
    privateKey: stringifyPrivateKey({
      comment: "signify private key",
      algorithm,
      kdfAlgorithm,
      kdfRounds: kdfRounds,
      salt,
      checksum: createHash("sha512")
        .update(keyPair.privateKey)
        .digest()
        .subarray(0, 8),
      keyNumber,
      content: Buffer.from(
        Buffer.alloc(64).map(
          (value, index) => derivedPrivateKey[index] ^ keyPair.privateKey[index]
        )
      ),
    }),
    publicKey: stringifyPublicKey({
      comment: "signify public key",
      algorithm,
      keyNumber,
      content: keyPair.publicKey,
    }),
  };
}
