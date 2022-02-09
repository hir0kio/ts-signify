import { pbkdf } from "bcrypt-pbkdf";
import { Buffer } from "buffer";
import * as nacl from "tweetnacl";
import { SecretKey } from "./interfaces";

export interface SecretKeyDecryptionOptions {
  secretKey: SecretKey;
  passphrase?: string;
}

export function decryptSecretKey(
  options: SecretKeyDecryptionOptions
): Buffer | null {
  let derivedKey = Buffer.alloc(64);

  if (options.passphrase) {
    pbkdf(
      Buffer.from(options.passphrase),
      Buffer.from(options.passphrase).length,
      options.secretKey.salt,
      options.secretKey.salt.length,
      derivedKey,
      derivedKey.length,
      options.secretKey.kdfRounds
    );
  }

  let decryptedKey = Buffer.from(
    Buffer.alloc(64).map(
      (value, index) => options.secretKey.content[index] ^ derivedKey[index]
    )
  );

  if (
    Buffer.compare(
      options.secretKey.checksum,
      nacl.hash(decryptedKey).subarray(0, 8)
    ) !== 0
  ) {
    return null; // incorrect passphrase
  }

  return decryptedKey;
}
