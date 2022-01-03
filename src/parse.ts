import {
  PublicKey,
  PrivateKey,
  Signature,
  checkPrivateKey,
  checkPublicKey,
  checkSignature,
  _buf2num,
} from ".";

function _parseContainer<T extends PrivateKey | PublicKey | Signature>(
  input: Buffer | string,
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

export function parsePrivateKey(input: Buffer | string): PrivateKey | null {
  return _parseContainer<PrivateKey>(input, (comment, content) => {
    let privateKey = {
      comment,
      algorithm: content.subarray(0, 2).toString(),
      kdfAlgorithm: content.subarray(2, 4).toString(),
      kdfRounds: _buf2num(content.subarray(4, 8)),
      salt: content.subarray(8, 24),
      checksum: content.subarray(24, 32),
      keyNumber: content.subarray(32, 40),
      content: content.subarray(40, 104),
    };

    return checkPrivateKey(privateKey) ? privateKey : null;
  });
}

export function parsePublicKey(input: Buffer | string): PublicKey | null {
  return _parseContainer(input, (comment, content) => {
    let publicKey = {
      comment,
      algorithm: content.subarray(0, 2).toString(),
      keyNumber: content.subarray(2, 10),
      content: content.subarray(10, 42),
    };

    return checkPublicKey(publicKey) ? publicKey : null;
  });
}

export function parseSignature(input: Buffer | string): Signature | null {
  return _parseContainer(input, (comment, content) => {
    let signature = {
      comment,
      algorithm: content.subarray(0, 2).toString(),
      keyNumber: content.subarray(2, 10),
      content: content.subarray(10, 74),
    };

    return checkSignature(signature) ? signature : null;
  });
}
