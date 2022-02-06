import { pbkdf } from "bcrypt-pbkdf";
import * as nacl from "tweetnacl";
import { PrivateKey } from "./interfaces";

export interface PrivateKeyDecryptionOptions {
  privateKey: PrivateKey;
  passphrase?: string;
}

export function decryptPrivateKey(
  options: PrivateKeyDecryptionOptions
): Buffer | null {
  let derivedKey = Buffer.alloc(64);

  if (options.passphrase) {
    pbkdf(
      Buffer.from(options.passphrase),
      Buffer.from(options.passphrase).length,
      options.privateKey.salt,
      options.privateKey.salt.length,
      derivedKey,
      derivedKey.length,
      options.privateKey.kdfRounds
    );
  }

  let decryptedKey = Buffer.from(
    Buffer.alloc(64).map(
      (value, index) => options.privateKey.content[index] ^ derivedKey[index]
    )
  );

  if (
    Buffer.compare(
      options.privateKey.checksum,
      nacl.hash(decryptedKey).subarray(0, 8)
    ) !== 0
  ) {
    return null; // incorrect passphrase
  }

  return decryptedKey;
}
