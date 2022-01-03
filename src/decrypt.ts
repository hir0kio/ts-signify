import { pbkdf } from "bcrypt-pbkdf";
import { assert } from "console";
import { createHash } from "crypto";
import { PrivateKey, _buf2num, _UnencryptedPrivateKey } from ".";

export interface _DecryptPrivateKeyOptions {
  privateKey: PrivateKey;
  passphrase?: string;
}

export function _decryptPrivateKey(
  options: _DecryptPrivateKeyOptions
): _UnencryptedPrivateKey | null {
  assert(Buffer.from(options.privateKey.algorithm).toString() === "Ed");
  assert(Buffer.from(options.privateKey.kdfAlgorithm).toString() === "BK");

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
      createHash("sha512").update(decryptedKey).digest().subarray(0, 8)
    ) !== 0
  ) {
    return null; // incorrect passphrase
  }

  return {
    ...options.privateKey,
    unencryptedContent: decryptedKey,
  };
}
