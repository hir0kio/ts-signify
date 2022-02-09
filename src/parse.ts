import { Buffer } from "buffer";
import { checkPublicKey, checkSecretKey, checkSignature } from "./check";
import { PublicKey, SecretKey, Signature } from "./interfaces";
import { getNumberFromBuffer } from "./utilities";

function parse<T extends PublicKey | SecretKey | Signature>(
  input: Uint8Array | string,
  parseContent: (comment: string, content: Buffer) => T | null
): T | null {
  try {
    let split = input.toString().split("\n", 2);
    let comment = split[0].match(/^untrusted comment: (.*?)$/)![1];
    let content = split[1];

    return content
      ? parseContent(comment, Buffer.from(content, "base64"))
      : null;
  } catch (e) {
    return null;
  }
}

export function parsePublicKey(input: Uint8Array | string): PublicKey | null {
  return parse(input, (comment, content) => {
    let publicKey = {
      comment,
      algorithm: content.subarray(0, 2).toString(),
      id: content.subarray(2, 10),
      content: content.subarray(10, 42),
    };

    return checkPublicKey(publicKey) ? publicKey : null;
  });
}

export function parseSecretKey(input: Uint8Array | string): SecretKey | null {
  return parse<SecretKey>(input, (comment, content) => {
    let secretKey = {
      comment,
      algorithm: content.subarray(0, 2).toString(),
      kdfAlgorithm: content.subarray(2, 4).toString(),
      kdfRounds: getNumberFromBuffer(content.subarray(4, 8)),
      salt: content.subarray(8, 24),
      checksum: content.subarray(24, 32),
      id: content.subarray(32, 40),
      content: content.subarray(40, 104),
    };

    return checkSecretKey(secretKey) ? secretKey : null;
  });
}

export function parseSignature(input: Buffer | string): Signature | null {
  return parse(input, (comment, content) => {
    let signature = {
      comment,
      algorithm: content.subarray(0, 2).toString(),
      keyId: content.subarray(2, 10),
      content: content.subarray(10, 74),
    };

    return checkSignature(signature) ? signature : null;
  });
}
